import React from 'react';
import { X, ShieldCheck, FileText, Info, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

interface LegalModalProps {
  type: 'about' | 'terms' | 'privacy' | 'contact' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-2">
            {type === 'about' && (
              <>
                <Info className="w-5 h-5 text-emerald-600" />
                <span>About Us (আমাদের সম্পর্কে)</span>
              </>
            )}
            {type === 'terms' && (
              <>
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>Terms & Conditions (শর্তাবলী)</span>
              </>
            )}
            {type === 'privacy' && (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Privacy Policy (গোপনীয়তা নীতি)</span>
              </>
            )}
            {type === 'contact' && (
              <>
                <Mail className="w-5 h-5 text-emerald-600" />
                <span>Contact & Support (যোগাযোগ ও সাপোর্ট)</span>
              </>
            )}
          </h3>
          <button
            id="close-legal-modal-btn"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-600 leading-relaxed">
          {type === 'about' && (
            <div className="space-y-3">
              <p>
                <strong>ভিডিও দেখে আয় করুন</strong> হলো বাংলাদেশের একটি জনপ্রিয় মাইক্রো-রিওয়ার্ড প্ল্যাটফর্ম। আমরা অনুমোদিত কনটেন্ট ক্রিয়েটর ও স্পনসরদের ভিডিও প্রদর্শন করে ব্যবহারকারীদের মূল্যবান সময় ও অংশগ্রহণের জন্য নগদ পুরস্কার প্রদান করি।
              </p>
              <h4 className="font-bold text-slate-900 mt-3">আমাদের বৈশিষ্ট্যসমূহ:</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>মাত্র ৫ বা ১০ সেকেন্ডের অনুমোদিত ভিডিও টাস্ক।</li>
                <li>সরাসরি ব্যালেন্সে স্বচ্ছ ক্যাশ রিওয়ার্ড (৳১ / ৳২)।</li>
                <li>ন্যূনতম ৳২০০ ব্যালেন্স এবং ২০টি ভ্যালিড রেফারেল পূরণ সাপেক্ষে bKash ও Nagad-এ সরাসরি উত্তোলন।</li>
                <li>১০০% নিরাপদ ও স্বচ্ছ ইউজার পলিসি।</li>
              </ul>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-3">
              <p className="font-semibold text-slate-800">
                প্ল্যাটফর্ম ব্যবহারের সাধারণ শর্তাবলী:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong>টাস্ক টাইমার:</strong> প্রতিটি ভিডিওর জন্য নির্ধারিত ৫ বা ১০ সেকেন্ডের সম্পূর্ণ সময় সক্রিয়ভাবে দেখতে হবে।
                </li>
                <li>
                  <strong>উইথড্র নিয়ম:</strong> উইথড্র করার জন্য আপনার বর্তমান মেইন ব্যালেন্স ন্যূনতম ৳২০০ হতে হবে এবং অন্তত ২০ জন সক্রিয় (Valid) রেফারেল থাকতে হবে।
                </li>
                <li>
                  <strong>ভ্যালিড রেফারেল:</strong> একজন রেফারেল সদস্য রেজিস্ট্রেশনের পর অন্তত ১টি ভিডিও টাস্ক সম্পন্ন করলে তাকে ভ্যালিড রেফারেল হিসেবে গণ্য করা হবে।
                </li>
                <li>
                  <strong>বিজ্ঞাপন শর্তমুক্তি:</strong> Reward প্রাপ্তির সঙ্গে কোনো প্রকার বিজ্ঞাপন দেখা বা ক্লিক করার বাধ্যতামূলক শর্ত নেই।
                </li>
                <li>
                  <strong>কুলডাউন সিস্টেম:</strong> ফেয়ার ইউসেজ নিশ্চিতে টাস্ক কোটা শেষ হলে ৫ ঘণ্টার কুলডাউন প্রযোজ্য হতে পারে।
                </li>
              </ol>
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-3">
              <p>
                আমরা আপনার ব্যক্তিগত তথ্যের নিরাপত্তা ও গোপনীয়তা রক্ষায় সর্বোচ্চ গুরুত্ব দেই।
              </p>
              <h4 className="font-bold text-slate-900 mt-2">তথ্য সংগ্রহ ও ব্যবহার:</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>উইথড্র ও অ্যাকাউন্ট ব্যবস্থাপনার জন্য কেবল আপনার মোবাইল নম্বর ও নাম ব্যবহার করা হয়।</li>
                <li>আমরা ব্যবহারকারীর কোনো সংবেদনশীল তথ্য তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করি না।</li>
                <li>সকল লেনদেন ও রিওয়ার্ড ডাটা এনক্রিপ্টেড সিকিউরিটির মাধ্যমে সংরক্ষিত থাকে।</li>
              </ul>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <p>
                যেকোনো প্রশ্ন, মতামত বা পেমেন্ট সংক্রান্ত সহায়তার জন্য আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন:
              </p>
              <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">support@videodekheay.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">+880 1700-000000 (সকাল ৯টা - রাত ৯টা)</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">ঢাকা, বাংলাদেশ</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition"
          >
            বন্ধ করুন (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
