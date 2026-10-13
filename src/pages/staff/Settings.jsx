// src/pages/staff/Settings.jsx
import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { User, Shield, Building, Mail, Hash, CheckCircle2, Lock } from 'lucide-react';

const Settings = () => {
  // Retrieve user profile data from auth store
  const { user } = useAuthStore();
  const profile = user?.profile || {};

  const [formData, setFormData] = useState({
    fullname: profile.fullname || 'John Doe',
    email: profile.email || 'john.doe@abiastate.gov.ng',
    staffId: profile.staff_id || 'STF-001',
    mda: profile.mda_id || 'MDA-FINANCE',
    department: profile.department_id || 'DEP-ACCOUNTS',
    role: profile.pms_role || 'STAFF',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    setSuccessMessage('Profile settings updated successfully.');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Staff Account Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your official civil service profile credentials and department assignments.
        </p>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl shadow-sm">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#0B5C35] to-[#137a48] p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold tracking-wider">
              {formData.fullname.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-base font-bold">{formData.fullname}</h3>
              <p className="text-xs text-emerald-100/90 font-mono mt-0.5">Staff ID: {formData.staffId}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/15 border border-white/20 text-white text-[11px] font-extrabold rounded-full">
            Role: {formData.role}
          </span>
        </div>

        {/* Form Details */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <User size={16} />
                </span>
                <input
                disabled
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Official Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  disabled
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Staff ID (Read-only / Locked) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Staff ID Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Hash size={16} />
                </span>
                <input
                  type="text"
                  disabled
                  value={formData.staffId}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-500 cursor-not-allowed font-mono"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Staff ID is permanently assigned by the Head of Service.</span>
            </div>

            {/* PMS Role (Read-only / Locked) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                PMS Access Role
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Shield size={16} />
                </span>
                <input
                  type="text"
                  disabled
                  value={formData.role}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-500 cursor-not-allowed font-mono uppercase"
                />
              </div>
            </div>

            {/* MDA ID */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                MDA Identification
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Building size={16} />
                </span>
                <input
                  type="text"
                  disabled
                  value={formData.mda}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-500 cursor-not-allowed font-medium"
                />
              </div>
            </div>

            {/* Department ID */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Department Identification
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Building size={16} />
                </span>
                <input
                  type="text"
                  disabled
                  value={formData.department}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-500 cursor-not-allowed font-medium"
                />
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;