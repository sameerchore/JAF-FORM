import { useState } from "react";
import axios from "axios";
import "./JAFForm.css";
import logo from "./image.png";

const API_URL = "https://sheetdb.io/api/v1/hchxcqji6hdh2"; // your SheetDB API

function JAFForm() {
    const [form, setForm] = useState({});

    const btechBranches = ["CSE", "EC", "EE", "CH", "ME", "TT", "PE", "IT", "CE", "IN"];
    const mtechBranches = ["AI", "IN", "CAD/CAM", "PLCM", "CN&IS", "IT", "SE", "VLSI", "TT", "WM"];
    const selectionProcess = [
        "ppt",
        "resume_shortlist",
        "written_test",
        "online_test",
        "technical_test",
        "aptitude_test",
        "psychometric_test",
        "gd",
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset the form?")) {
            setForm({});
            document.querySelector(".jaf-form").reset();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine B.Tech branches
        const btechSelected = btechBranches
            .filter(branch => form[`btech_${branch.toLowerCase()}`])
            .join(", ");

        // Combine M.Tech branches
        const mtechSelected = mtechBranches
            .filter(branch => form[`mtech_${branch.toLowerCase()}`])
            .join(", ");

        // Combine selection process checkboxes
        const selectionSelected = selectionProcess
            .filter(process => form[process])
            .join(", ");

        // Prepare data to send
        const dataToSend = {
            ...form,
            btech_branches: btechSelected,
            mtech_branches: mtechSelected,
            selection_process: selectionSelected,
        };

        try {
            await axios.post(API_URL, { data: [dataToSend] });
            alert("Form submitted successfully!");
            setForm({});
            e.target.reset();
        } catch (err) {
            console.error(err);
            alert("Submission failed");
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="jaf-form">
                <header className="form-header">
                    <img src={logo} alt="SGGSIET Logo" className="form-logo" />
                    <h2>Job Announcement Form</h2>
                    <p className="form-subtitle">Fill The Form Manually</p>
                </header>

                {/* --- General / Basic Info --- */}
                <section className="form-section">
                    <h3>General / Basic Info</h3>
                    <div className="form-grid">
                        <input name="email" type="email" placeholder="Enter Your Email" onChange={handleChange} required />
                        <input name="org_name" type="text" placeholder="Name of Organisation" onChange={handleChange} />
                        <input name="postal_address" type="text" placeholder="Postal Address" onChange={handleChange} />
                        <input name="website" type="url" placeholder="Website Link (if any)" onChange={handleChange} />
                    </div>
                </section>

                {/* --- Job Profile --- */}
                <section className="form-section">
                    <h3>Job Profile</h3>
                    <div className="form-grid">
                        <input name="job_designation" type="text" placeholder="Job Designation" onChange={handleChange} />
                        <input name="job_location" type="text" placeholder="Job Location" onChange={handleChange} />
                    </div>
                    <textarea name="job_description" placeholder="Job Description" onChange={handleChange} rows="3"></textarea>
                </section>

                {/* --- Organisation Type & Sector --- */}
                <section className="form-section">
                    <h3>Organisation Type & Industry Sector</h3>
                    <div className="form-grid">
                        <select name="org_type" onChange={handleChange}>
                            <option value="">Type Of Organisation</option>
                            <option value="Private">Private Sector</option>
                            <option value="Public">Public Sector</option>
                            <option value="Government">Government</option>
                            <option value="Start-Up">Start-Up</option>
                            <option value="MNC_Indian">MNC (Indian Origin)</option>
                            <option value="MNC_Foreign">MNC (Foreign Origin)</option>
                        </select>
                        <input name="org_type_other" type="text" placeholder="If Other, specify" onChange={handleChange} />
                        <select name="industry_sector" onChange={handleChange}>
                            <option value="">Industry Sector</option>
                            <option value="Analytics">Analytics</option>
                            <option value="Consulting">Consulting</option>
                            <option value="Core">Core (Technical)</option>
                            <option value="Finance">Finance</option>
                            <option value="IT">I.T./Software</option>
                            <option value="Management">Management</option>
                            <option value="Teaching">Teaching/Research</option>
                        </select>
                        <input name="industry_other" type="text" placeholder="If Other, specify" onChange={handleChange} />
                    </div>
                </section>

                {/* --- Contact Details --- */}
                <section className="form-section">
                    <h3>Contact Details</h3>
                    <div className="contact-group">
                        <p className="subsection-title">Head HR</p>
                        <div className="form-grid">
                            <input name="hr_name" placeholder="Name" onChange={handleChange} />
                            <input name="hr_email" placeholder="Email" onChange={handleChange} />
                            <input name="hr_mobile" placeholder="Mobile" onChange={handleChange} />
                            <input name="hr_phone" placeholder="Phone" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="contact-group">
                        <p className="subsection-title">First Person Contact</p>
                        <div className="form-grid">
                            <input name="p1_name" placeholder="Name" onChange={handleChange} />
                            <input name="p1_email" placeholder="Email" onChange={handleChange} />
                            <input name="p1_mobile" placeholder="Mobile" onChange={handleChange} />
                            <input name="p1_phone" placeholder="Phone" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="contact-group">
                        <p className="subsection-title">Second Person Contact</p>
                        <div className="form-grid">
                            <input name="p2_name" placeholder="Name" onChange={handleChange} />
                            <input name="p2_email" placeholder="Email" onChange={handleChange} />
                            <input name="p2_mobile" placeholder="Mobile" onChange={handleChange} />
                            <input name="p2_phone" placeholder="Phone" onChange={handleChange} />
                        </div>
                    </div>
                </section>

                {/* --- Salary Break-Up --- */}
                <section className="form-section">
                    <h3>Salary Break-Up</h3>
                    <div className="form-grid">
                        <input name="ctc" placeholder="Cost To Company (CTC)" onChange={handleChange} />
                        <input name="stipend" placeholder="Stipend" onChange={handleChange} />
                        <input name="bonus" placeholder="Bonus / Perks / Incentives" onChange={handleChange} />
                    </div>
                </section>

                {/* --- Eligibility Criteria --- */}
                <section className="form-section">
                    <h3>Eligibility Criteria</h3>
                    <div className="form-grid triple">
                        <input name="cgpa" placeholder="CGPA (on 10)" onChange={handleChange} />
                        <input name="xii_percent" placeholder="XII %" onChange={handleChange} />
                        <input name="x_percent" placeholder="X %" onChange={handleChange} />
                    </div>
                </section>

                {/* --- Selection Process --- */}
                <section className="form-section">
                    <h3>Selection Process</h3>
                    <div className="checkbox-container">
                        {selectionProcess.map(process => (
                            <label key={process} className="checkbox-label">
                                <input type="checkbox" name={process} onChange={handleChange} /> {process.replace(/_/g, " ").toUpperCase()}
                            </label>
                        ))}
                    </div>
                    <div className="form-grid triple">
                        <input name="rounds" placeholder="Number of rounds" onChange={handleChange} />
                        <input name="offers" placeholder="Number of offers" onChange={handleChange} />
                        <input name="preferred_period" placeholder="Preferred Period" onChange={handleChange} />
                    </div>
                </section>

                {/* --- Logistics / Branches --- */}
                <section className="form-section">
                    <h3>Logistics / Branches</h3>
                    <div className="branch-group">
                        <p className="subsection-subtitle">B.Tech Branches</p>
                        <div className="checkbox-container branches">
                            {btechBranches.map(branch => (
                                <label key={branch} className="checkbox-label">
                                    <input type="checkbox" name={`btech_${branch.toLowerCase()}`} onChange={handleChange} /> {branch}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="branch-group">
                        <p className="subsection-subtitle">M.Tech Branches</p>
                        <div className="checkbox-container branches">
                            {mtechBranches.map(branch => (
                                <label key={branch} className="checkbox-label">
                                    <input type="checkbox" name={`mtech_${branch.toLowerCase()}`} onChange={handleChange} /> {branch}
                                </label>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="form-actions">
                    <button type="button" className="reset-btn" onClick={handleReset}>Reset Form</button>
                    <button type="submit" className="submit-btn">Submit Recruitment Details</button>
                </div>
            </form>
        </div>
    );
}

export default JAFForm;
