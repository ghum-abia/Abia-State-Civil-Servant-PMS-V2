// src/pages/hod/MyStaffs.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useAssignableStaff } from '../../hooks/hod/useAssignableStaff';
import { Users, Mail, Shield, AlertCircle, UserCheck, Hash, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Spinner from '../../components/UI/Spinner';

export default function MyStaffsPage() {
  const { staffList, isLoading, error, fetchAssignableStaff } = useAssignableStaff();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (typeof fetchAssignableStaff === 'function') {
      fetchAssignableStaff();
    }
  }, [fetchAssignableStaff]);

  // Filter staff based on search query (Name, Email, Staff ID)
  const filteredStaff = useMemo(() => {
    if (!searchQuery.trim()) return staffList;
    const query = searchQuery.toLowerCase();
    return staffList.filter(
      (staff) =>
        (staff.fullname && staff.fullname.toLowerCase().includes(query)) ||
        (staff.email && staff.email.toLowerCase().includes(query)) ||
        (staff.staff_id && staff.staff_id.toLowerCase().includes(query))
    );
  }, [staffList, searchQuery]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage) || 1;
  const paginatedStaff = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStaff.slice(start, start + itemsPerPage);
  }, [filteredStaff, currentPage]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-12 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold text-[#0B5C35] shrink-0">
          <UserCheck size={16} /> Total Team Members: {staffList.length}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or Staff ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors"
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 self-start sm:self-auto px-2 py-1"
          >
            Clear Search
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl shadow-sm">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : filteredStaff.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
          <Users size={44} className="text-slate-300 mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No staff members found</h3>
          <p className="text-xs text-slate-400 mt-1">
            {searchQuery ? 'No matching staff members found for your search query.' : 'There are currently no officers registered under your supervision.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100 tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Staff Name / Identity</th>
                  <th className="py-3.5 px-5">Staff ID</th>
                  <th className="py-3.5 px-5">Email Address</th>
                  <th className="py-3.5 px-5">MDA / Dept</th>
                  <th className="py-3.5 px-5">Role</th>
                  <th className="py-3.5 px-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {paginatedStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#0B5C35] flex items-center justify-center text-xs font-black uppercase shrink-0">
                        {(staff.fullname || staff.email || 'U').charAt(0)}
                      </div>
                      <span>{staff.fullname || 'Unnamed Officer'}</span>
                    </td>
                    <td className="py-4 px-5 text-slate-600">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        <Hash size={11} className="text-slate-400" /> {staff.staff_id || 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Mail size={13} className="text-slate-400 shrink-0" />
                        <span>{staff.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-600">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-slate-700">{staff.mda_id || '—'}</span>
                        <span className="text-[10px] text-slate-400">{staff.department_id || '—'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] font-bold">
                        {staff.pms_role || 'STAFF'}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-bold">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-100 gap-4">
            <p className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-700">{filteredStaff.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-bold text-slate-700">{Math.min(currentPage * itemsPerPage, filteredStaff.length)}</span> of <span className="font-bold text-slate-700">{filteredStaff.length}</span> entries
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronLeft size={14} /> Previous
              </button>

              <span className="text-xs font-bold text-slate-600 px-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}