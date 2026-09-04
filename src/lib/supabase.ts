const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || '';

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  '';

export const supabaseConfigured =
  Boolean(SUPABASE_URL && SUPABASE_KEY);

const headers = () => ({
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
});

export async function dbSelectTasks() {
  if (!supabaseConfigured) return [];

  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/video_tasks?select=id,data&order=created_at.desc`,
    { headers: headers() }
  );

  if (!r.ok) throw new Error(`tasks ${r.status}`);

  return (await r.json()).map((x: any) => ({
    ...x.data,
    id: x.id,
  }));
}

export async function uploadImageDataUrl(
  dataUrl: string,
  id: string
) {
  if (
    !supabaseConfigured ||
    !dataUrl.startsWith('data:image/')
  ) {
    return dataUrl;
  }

  const m = dataUrl.match(
    /^data:(image\/[\w.+-]+);base64,(.+)$/
  );

  if (!m) return dataUrl;

  const mime = m[1];
  const bytes = Uint8Array.from(
    atob(m[2]),
    c => c.charCodeAt(0)
  );

  const ext = mime
    .split('/')[1]
    .replace('jpeg', 'jpg');

  const path = `tasks/${id}.${ext}`;

  const r = await fetch(
    `${SUPABASE_URL}/storage/v1/object/images/${path}`,
    {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': mime,
        'x-upsert': 'true',
      },
      body: bytes,
    }
  );

  if (!r.ok) throw new Error(`image ${r.status}`);

  return `${SUPABASE_URL}/storage/v1/object/public/images/${path}`;
}

export async function dbInsertTask(task: any) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/video_tasks`,
    {
      method: 'POST',
      headers: {
        ...headers(),
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        id: task.id,
        data: task,
      }),
    }
  );

  if (!r.ok) throw new Error(`save ${r.status}`);
}

export async function dbUpdateTask(task: any) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/video_tasks?id=eq.${encodeURIComponent(task.id)}`,
    {
      method: 'PATCH',
      headers: {
        ...headers(),
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        data: task,
      }),
    }
  );

  if (!r.ok) throw new Error(`update ${r.status}`);
}

export async function dbDeleteTask(id: string) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/video_tasks?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
      headers: headers(),
    }
  );

  if (!r.ok) throw new Error(`delete ${r.status}`);
}

export async function trackVisit(taskId?: string) {
  if (!supabaseConfigured) return;

  try {
    await fetch(
      `${SUPABASE_URL}/rest/v1/site_visits`,
      {
        method: 'POST',
        headers: {
          ...headers(),
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          task_id: taskId || null,
        }),
      }
    );
  } catch {
    // Ignore visit tracking errors
  }
}
