import React, { useState } from 'react';
import ReferralStatsChart from '../components/affiliate-dashboard/ReferralStatsChart';
import ReferralLinkCard from '../components/affiliate-dashboard/ReferralLinkBox';
import ReferralsTable from '../components/affiliate-dashboard/ReferralUsersTable';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../App';

const AffiliateDashboard = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);



  const handleBalanceClick = async () => {
  if (loading) return; // Prevent multiple clicks
  setLoading(true);

  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = userData.email;

  if (!userEmail) {
    setLoading(false);
    return Swal.fire({
      icon: 'error',
      title: 'Authentication Error',
      text: 'User email not found. Please log in again.',
    });
  }

  if (points < 10) {
    setLoading(false);
    await Swal.fire({
      icon: 'warning',
      title: 'Minimum Payout Not Reached',
      html: `
        <p>You need at least <strong>$10</strong> to request a payout.</p>
      `,
      confirmButtonText: 'Okay',
      confirmButtonColor: '#0d6efd',
    });
    return;
  }

  try {
    const { data } = await axios.post(`${API}/api/affiliate/wallet`, { email: userEmail });

    if (!data || data.error || !data.wallet || !data.wallet_method || !data.affiliator_address) {
      setLoading(false);
      await Swal.fire({
        icon: 'info',
        title: 'Incomplete Payment Info',
        html: `
          <p>Your wallet information is incomplete or missing.</p>
          <p>Please <a href="/affiliate-dashboard/payment-settings" style="color:#0d6efd;">complete your payment settings</a> before requesting a payout.</p>
        `,
        confirmButtonText: 'Go to Settings',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }

    const result = await Swal.fire({
      icon: 'question',
      title: 'Ready to Cash Out?',
      text: `You're about to request a payout of $${points.toFixed(2)}.`,
      showCancelButton: true,
      confirmButtonText: "Let's go!",
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
    });

    if (result.isConfirmed) {
      await handleRequestPayout();
    }
  } catch (error: any) {
    console.error(error);
    const errorMsg = error?.response?.data?.error || 'Unable to verify payment details. Please try again later.';
    await Swal.fire({
      icon: 'error',
      title: 'Server Error',
      text: errorMsg,
    });
  }

  setLoading(false);
};




  const handleRequestPayout = async () => {
     const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = userData.email;

  if (!userEmail) {
    setLoading(false);
    return Swal.fire({
      icon: 'error',
      title: 'Authentication Error',
      text: 'User email not found. Please log in again.',
    });
  }

    try {
      const response = await axios.post(`${API}/api/affiliate/request-payout`, {
        email: userEmail 
      });

      if (response.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Payout Requested!',
          text: '✅ Your payout request has been submitted successfully.',
          confirmButtonColor: '#198754',
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      await Swal.fire({
        icon: 'error',
        title: 'Request Failed',
        text: '❌ Something went wrong while sending your payout request.',
        confirmButtonColor: '#dc3545',
      });
    }
  };

  return (
    <main className="py-5 container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Affiliate Dashboard</h2>

        <Dropdown>
        <button
  className="btn btn-outline-primary rounded-pill"
  onClick={handleBalanceClick}
  disabled={loading}
>
  {loading ? (
    <>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    </>
  ) : (
    <>${points.toFixed(2)} Balance</>
  )}
</button>


          <Dropdown.Toggle className="rounded-pill px-4 py-2" />

          <Dropdown.Menu align="end">
            <Dropdown.Item href="/affiliate-dashboard/payment-settings">
              Setting Payment Method
            </Dropdown.Item>
            <Dropdown.Item href="/affiliate-dashboard/payment-history">
              My Payment History
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Pass setter down */}
      <ReferralStatsChart onBalanceUpdate={setPoints} />

      <ReferralLinkCard />
      <ReferralsTable />
    </main>
  );
};

export default AffiliateDashboard;
