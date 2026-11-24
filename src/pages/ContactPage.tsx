import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', department: 'general', message: '' });
    setSubmitted(false);
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 animate-fadeIn"
      data-testid="contact-page"
    >
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600">
          <MessageSquare className="w-4 h-4 text-cyan-500" />
          <span>Customer &amp; Technical Inquiries</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-meridian-950">
          Contact &amp; Support Simulation
        </h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
          Have questions about CartFlow 4.0 architecture, catalogue specifications, or automated testing? Connect with our development and SDET evaluation team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-warm">
          {submitted ? (
            <div className="text-center py-12 space-y-6 animate-fadeIn" data-testid="contact-success-message">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-warm-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-display text-2xl font-bold text-meridian-950">
                  Message Dispatched (Simulated)
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. In a live production environment, your inquiry would be routed to our {formData.department} dispatch queue. In this demonstration, client state is maintained cleanly.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-meridian-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-meridian-950 transition-all shadow-warm-sm"
                >
                  <span>Send Another Message</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="font-display text-xl font-bold text-meridian-950">
                  Send a Demonstration Message
                </h2>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Client Simulation
                </span>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex.morgan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label htmlFor="contact-dept" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Department
                </label>
                <select
                  id="contact-dept"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 cursor-pointer"
                >
                  <option value="general">General Marketplace Inquiries</option>
                  <option value="sdet">SDET Automation &amp; Test Suite</option>
                  <option value="engineering">Architecture &amp; Performance</option>
                  <option value="support">Customer Experience Simulation</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="contact-msg" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-msg"
                  required
                  rows={4}
                  placeholder="Enter your message or inquiry here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-meridian-900 hover:bg-meridian-950 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-warm-sm active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>{isSubmitting ? 'Sending Simulation...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200/90 p-8 shadow-warm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-meridian-950">
                  Demonstration Notice
                </h3>
                <span className="text-xs text-slate-500">Pure Client-Side Implementation</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              This contact mechanism is an interactive UI simulation designed to demonstrate form validation, focus states, and responsive layout fidelity. No external network requests or personal data transfers occur.
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero External Transmission • Privacy Guaranteed</span>
            </div>
          </div>

          <div className="rounded-3xl bg-meridian-900 text-white p-8 shadow-warm-lg space-y-4">
            <h4 className="font-display text-lg font-bold text-white">
              Looking for Marketplace Products?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Browse our complete 30-item curated catalogue across Electronics, Fashion, Home, Bags, Fitness, and Stationery.
            </p>
            <div>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
