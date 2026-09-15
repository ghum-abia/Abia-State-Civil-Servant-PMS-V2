import React, { useState, useEffect } from 'react';
import DashboardSkeleton from '../../components/UI/DashboardSkeleton';
import Spinner from '../../components/UI/Spinner';
import ShimmerButton from '../../components/UI/ShimmerBtn';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate fetching data from Supabase
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Handle button action simulation
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 5000);
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h1>

      <ShimmerButton onClick={handleSubmit} disabled={isSubmitting}>
        <div className="flex justify-center items-center gap-2">
          <span>{isSubmitting ? 'Submitting' : 'Submit Report'}</span>
           {isSubmitting && <div class="w-6 h-6 text-white"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="1.5"><animate attributeName="r" dur="0.75s" values="1.5;3;1.5" repeatCount="indefinite"></animate></circle><circle cx="12" cy="12" r="3"><animate attributeName="r" dur="0.75s" values="3;1.5;3" repeatCount="indefinite"></animate></circle><circle cx="20" cy="12" r="1.5"><animate attributeName="r" dur="0.75s" values="1.5;3;1.5" repeatCount="indefinite"></animate></circle></svg></div>}
        </div>
      </ShimmerButton>
    </div>
  );
}

export default Dashboard;