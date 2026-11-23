import React, { useState } from 'react';
import { Star, MessageSquare, AlertCircle, CheckCircle, Send } from 'lucide-react';

interface DemoReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
}

interface DemoFeedbackSectionProps {
  productId: string;
  productName: string;
}

export const DemoFeedbackSection: React.FC<DemoFeedbackSectionProps> = ({
  productId,
  productName,
}) => {
  const [reviews, setReviews] = useState<DemoReview[]>([
    {
      id: 'demo-rev-1',
      author: 'SDET Quality Assessor',
      role: 'Hackathon Technical Reviewer',
      rating: 5,
      date: '2026-11-23',
      comment: 'Verified pure integer monetary calculations and strict absence of floating-point errors. Deterministic cart state updates cleanly.',
    },
    {
      id: 'demo-rev-2',
      author: 'Frontend Engineering Lead',
      role: 'UI/UX Evaluator',
      rating: 5,
      date: '2026-11-23',
      comment: 'Accessible focus outlines, responsive layout at 1440px and 375px viewports, and clean semantic structure verified.',
    },
  ]);

  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: DemoReview = {
      id: `demo-rev-${Date.now()}`,
      author: authorName.trim(),
      role: 'Community Evaluator (Demo)',
      rating,
      date: new Date().toISOString().split('T')[0],
      comment: comment.trim(),
    };

    setReviews([newRev, ...reviews]);
    setAuthorName('');
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      aria-labelledby="feedback-heading"
      className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-warm space-y-8"
      data-testid="demo-feedback-section"
    >
      {/* Explicit Disclaimer Notice */}
      <div
        role="note"
        aria-label="Demonstration content disclaimer"
        className="rounded-2xl bg-amber-50/80 border border-amber-200 p-4 sm:p-5 flex items-start gap-3.5 text-xs text-amber-900"
      >
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <h4 className="font-bold uppercase tracking-wider text-amber-800 text-[11px]">
            Demonstration Feedback Section
          </h4>
          <p className="leading-relaxed">
            The feedback and reviews presented below are synthetic test entries for SDET evaluation and UI demonstration. They do not represent verified commercial purchases or third-party endorsements.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 block mb-1">
            Quality & Architecture
          </span>
          <h3 id="feedback-heading" className="font-display text-2xl sm:text-3xl font-bold text-meridian-950">
            Evaluation Feedback for {productName}
          </h3>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
          {reviews.length} Demo Reviews
        </span>
      </div>

      {/* Interactive Demo Submission Form */}
      <form onSubmit={handleSubmit} className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4">
        <h4 className="font-display text-base font-bold text-meridian-950 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-cyan-600" aria-hidden="true" />
          <span>Add Evaluation Comment (Demonstration Mode)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`demo-name-${productId}`} className="block text-xs font-bold text-slate-700 mb-1">
              Reviewer Name / Role
            </label>
            <input
              id={`demo-name-${productId}`}
              data-testid="feedback-author-input"
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. QA Engineer, Accessibility Auditor"
              className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          <div>
            <label htmlFor={`demo-rating-${productId}`} className="block text-xs font-bold text-slate-700 mb-1">
              Demo Rating Score
            </label>
            <div className="flex items-center gap-1.5 pt-1.5" id={`demo-rating-${productId}`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  data-testid={`star-select-${star}`}
                  onClick={() => setRating(star)}
                  aria-label={`Select ${star} out of 5 stars`}
                  className="p-1 rounded hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-600 ml-2">{rating} / 5</span>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor={`demo-comment-${productId}`} className="block text-xs font-bold text-slate-700 mb-1">
            Technical Observation or Feedback
          </label>
          <textarea
            id={`demo-comment-${productId}`}
            data-testid="feedback-comment-input"
            required
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share an observation regarding calculations, validation, or component rendering..."
            className="w-full text-xs bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {submitted ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Demo comment added to local list!</span>
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">Stored in local session state</span>
          )}

          <button
            type="submit"
            data-testid="feedback-submit-btn"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-meridian-900 hover:bg-meridian-950 text-white text-xs font-bold uppercase tracking-wider shadow-warm-sm active:scale-95 transition-all"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>Submit Demo Review</span>
          </button>
        </div>
      </form>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-sm font-bold text-meridian-950 block">
                  {rev.author}
                </span>
                <span className="text-[11px] text-slate-400">{rev.role}</span>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1">
              &quot;{rev.comment}&quot;
            </p>

            <span className="text-[10px] text-slate-400 block pt-1">
              Recorded on {rev.date} • Synthetic Evaluation
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
