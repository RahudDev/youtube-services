import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../App";

type FormProps = {
  isNewUser: boolean;
  onSubmit: (data: any) => void;
};

const AffiliateForm: React.FC<FormProps> = ({ isNewUser, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    promotionPlan: "",
    socialPlatform: "",
    customPlatform: "",
    mainAudienceAccount: "",
    hasAffiliateExperience: "",
    aboutYourself: ""
  });

  const [platformOptions, setPlatformOptions] = useState([
    "Instagram",
    "TikTok",
    "YouTube",
    "Facebook",
    "X/Twitter",
    "Linkedin",
    "Other"
  ]);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true); // loading state for backend response
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
   const [countryCode, setCountryCode] = useState('');
    const [flagUrl, setFlagUrl] = useState('');


  const [error, setError] = useState<string>("");

const validateLink = (): boolean => {
  const { socialPlatform, mainAudienceAccount } = formData;
  const value = mainAudienceAccount.trim();

  const validators: { [key: string]: RegExp } = {
    Instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/,
    TikTok: /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/?$/,
    YouTube: /^https?:\/\/(www\.)?youtube\.com\/(channel|c|@)[\w.-]+\/?$/,
    Facebook: /^https?:\/\/(www\.)?facebook\.com\/[\w.-]+\/?$/,
    "X/Twitter": /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[\w.-]+\/?$/,
    Linkedin: /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/
  };

  const validator = validators[socialPlatform];

  if (validator) {
    if (!validator.test(value)) {
      setError(`❌ Invalid ${socialPlatform} link. Please enter a valid profile URL.`);
      return false;
    }
  } else {
    // Fallback for unknown/custom platforms — validate it's at least a URL
    const basicUrlPattern = /^https?:\/\/[\w.-]+\.[a-z]{2,}.*$/i;
    if (!basicUrlPattern.test(value)) {
      setError("❌ Invalid URL. Please enter a valid link.");
      return false;
    }
  }

  setError("");
  return true;
};






  useEffect(() => {
  const getCountry = async () => {
    try {
      const res = await axios.get("https://ipapi.co/json/");
      const code = res.data.country_code;
      setCountryCode(code);
      setFlagUrl(`https://flagcdn.com/w80/${code.toLowerCase()}.png`);
    } catch (err) {
      console.error("Failed to get country info");
    }
  };
  getCountry();
}, []);




  // ✅ Check localStorage and verify with backend
 useEffect(() => {
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");

  if (localUser?.email) {
    setFormData((prev) => ({ ...prev, email: localUser.email }));
    setLoading(true);

    axios
      .post(`${API}/api/affiliate/check-user`, { email: localUser.email })
      .then((res) => {
        const { isVerified, alreadySignedUp } = res.data;

        // Store status in state
        if (alreadySignedUp) {
          setAlreadySignedUp(true);
        }

        if (isVerified) {
          setIsVerifiedUser(true);
        }
      })
      .catch((err) => {
        console.error("Error checking user:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  } else {
    setLoading(false);
  }
}, []);



 useEffect(() => {
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  if (localUser?.name) {
    setGreeting(
      `Hi ${localUser.name}! 🎉 We're super excited you're here! Just a few more questions and boom — you're in. 🚀`
    );
  }
}, []);




if (loading) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
      <div className="spinner-border text-primary" role="status" />
      <span className="ms-2">Verifying your status...</span>
    </div>
  );
}



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = () => {
    setAcceptedTerms((prev) => !prev);
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
   
  
  if (!validateLink()) {
    // 🔴 Don't proceed if the social media URL is invalid
    return;
  }

  try {

    const affiliator_description = `
Platform: ${formData.socialPlatform} (${formData.mainAudienceAccount})
Affiliate Experience: ${formData.hasAffiliateExperience}
About: ${formData.aboutYourself}
`.trim();

    const localUser = JSON.parse(localStorage.getItem("user") || "{}");

    // ✅ If user already exists, just send affiliate data
    if (isVerifiedUser && localUser.email) {
      const response = await fetch(`${API}/api/affiliate/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localUser.email,
          affiliator_description,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return alert(result.error || "Submission failed.");
      }

      window.location.href = "/affiliate/pending-application";
    } else {
      // 🆕 New affiliate user signup
      const referredBy = localStorage.getItem('referredBy');

      const requestData: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country: countryCode,
        flag: flagUrl,
        affiliator_description,
      };

      if (referredBy) {
        requestData.referredBy = referredBy;
      }

      const response = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

         if (result.error === "Email signed up as affiliate but not yet verified") {
        // Redirect to your custom page, e.g.:
        return (window.location.href = "/verifyemail?affiliate=true");
      }

        if (result.error === "Email signed up but not yet verified") {
        // Redirect to your custom page, e.g.:
        return (window.location.href = "/verifyemail");
      }

      if (!response.ok) {
        return alert(result.error || "Signup failed.");
      }

      // ✅ Store safe user info
      const safeUser = {
        name: formData.name,
        email: formData.email,
        country: countryCode,
      };
      localStorage.setItem("user", JSON.stringify(safeUser));
      localStorage.removeItem("referredBy");

      window.location.href = "/verifyemail?affiliate=true";
    }
  } catch (err) {
    console.error("❌ Error submitting affiliate form:", err);
    alert("Something went wrong.");
  }
};






  return (
    <div className="container mt-5" style={{ maxWidth: "600px", marginBottom: "150px" }}>
     {isVerifiedUser && greeting && (
  <div className="alert alert-success text-center fw-semibold mb-3">
    {greeting}
  </div>
)}



      <h2 className="text-center mb-4">
        {isNewUser ? "Apply for Affiliate Program Today" : "Affiliate Application"}
      </h2>

      <form onSubmit={handleSubmit}>
        {isNewUser && !isVerifiedUser && (
          <>
            <div className="form-group mb-3">
              <label className="fw-semibold">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label className="fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label className="fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </>
        )}

         <div className="form-group mb-3">
        <label className="fw-semibold d-block mb-2">
          Your top audience account (Instagram, TikTok, etc.)
        </label>
        <div className="d-flex gap-2 align-items-start">
          {formData.socialPlatform === "Other" ? (
            <>
              <input
                type="text"
                className="form-control w-25"
                name="customPlatform"
                placeholder="Enter platform"
                value={formData.customPlatform || ""}
                onChange={handleChange}
                required
              />
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  if (formData.customPlatform?.trim()) {
                    setPlatformOptions((prev) => [
                      ...prev.filter((opt) => opt !== "Other"),
                      formData.customPlatform!,
                      "Other"
                    ]);
                    setFormData((prev) => ({
                      ...prev,
                      socialPlatform: formData.customPlatform!
                    }));
                  }
                }}
              >
                <i className="bi bi-check-lg"></i>
              </button>
            </>
          ) : (
            <select
              className="form-control w-25"
              name="socialPlatform"
              value={formData.socialPlatform || ""}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  socialPlatform: value,
                  customPlatform: value === "Other" ? "" : prev.customPlatform
                }));
              }}
              required
            >
              <option value="" disabled style={{ color: "#999" }}>
                Choose Platform
              </option>
              {platformOptions.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          )}

          <input
            type="text"
            className="form-control w-75"
            placeholder="Your username or link"
            name="mainAudienceAccount"
            value={formData.mainAudienceAccount}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="text-danger mt-1">{error}</div>}
      </div>

        <div className="form-group mb-3">
          <label className="fw-semibold">
            Do you have affiliate experience before?
          </label>
          <input
            type="text"
            name="hasAffiliateExperience"
            required
            value={formData.hasAffiliateExperience}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <label className="fw-semibold">
            Tell us more about yourself, How can you promote our site?
          </label>
          <textarea
            name="aboutYourself"
            required
            value={formData.aboutYourself}
            onChange={handleChange}
            className="form-control"
            rows={3}
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptedTerms}
            onChange={handleCheckboxChange}
            className="form-check-input"
            required
          />
          <label htmlFor="acceptTerms" className="form-check-label small">
            I agree to the{" "}
            <Link to="/affiliate-program/privacy" className="text-primary text-decoration-underline">
              Affiliate Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/affiliate-program/terms" className="text-primary text-decoration-underline">
              Terms & Conditions
            </Link>.
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {isNewUser ? "Sign Up & Apply" : "Apply Now"}
        </button>
      </form>
    </div>
  );
};

export default AffiliateForm;
