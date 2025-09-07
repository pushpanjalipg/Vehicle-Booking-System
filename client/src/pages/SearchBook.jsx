import React, { useState, useEffect } from "react";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard";
import "../App.css";
import { useForm } from "react-hook-form";

function SearchBook() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setFocus,
  } = useForm();
  const getFormData = getValues();

  const onSearch = async (data) => {
    try {
      setLoading(true); 
      const payload = { ...data };
      if (payload.startTime) {
        payload.startTime = new Date(payload.startTime).toISOString();
      }
      const res = await api.get("/vehicles/available", { params: payload });
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      setFocus(firstErrorField);
    }
  }, [errors, setFocus]);

  return (
    <>
      <div className="search_container">
        <h2>Search & Book Vehicle</h2>
        <form className="search_form" onSubmit={handleSubmit(onSearch)}>
          <div className="form_group">
            <label>
              Capacity:
              {errors.capacityRequired && (
                <span className="error-text">{errors.capacityRequired.message}</span>
              )}
            </label>
            <input
              className={`input ${errors.capacityRequired ? "error" : ""}`}
              type="number"
              min={1}
              placeholder="Capacity"
              {...register("capacityRequired", {
                required: "Capacity is required",
              })}
            />
          </div>

          <div className="form_group">
            <label>
              From Pincode:
              {errors.fromPincode && (
                <span className="error-text">{errors.fromPincode.message}</span>
              )}
            </label>
            <input
              className={`input ${errors.fromPincode ? "error" : ""}`}
              type="text"
              placeholder="From Pincode"
              {...register("fromPincode", {
                required: "From Pincode is required",
              })}
            />
          </div>

          <div className="form_group">
            <label>
              To Pincode:
              {errors.toPincode && (
                <span className="error-text">{errors.toPincode.message}</span>
              )}
            </label>
            <input
              className={`input ${errors.toPincode ? "error" : ""}`}
              type="text"
              placeholder="To Pincode"
              {...register("toPincode", {
                required: "To Pincode is required",
              })}
            />
          </div>

          <div className="form_group">
            <label>
              Date Time:
              {errors.startTime && (
                <span className="error-text">{errors.startTime.message}</span>
              )}
            </label>
            <input
              className={`input ${errors.startTime ? "error" : ""}`}
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              {...register("startTime", {
                required: "Start Time is required",
              })}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search Availability"}
          </button>
        </form>
      </div>

      <div className="card-container">
        {vehicles.map((v) => (
          <VehicleCard key={v._id} vehicle={v} searchForm={getFormData} />
        ))}
      </div>
    </>
  );
}

export default SearchBook;
