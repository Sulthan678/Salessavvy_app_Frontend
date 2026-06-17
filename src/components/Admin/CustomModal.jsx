import { useState, useEffect } from "react";


function CustomModal({

  modalType,

  onClose,

  onSubmit,
  response,
  selectedUser
}) {

  const [formData, setFormData] =
    useState({

      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      imageUrl: "",
      productId: "",

      userId: "",
      username: "",
      email: "",
      role: "",

      month: "",
      year: "",
      date: ""
    });

    useEffect(() => {

      if (selectedUser) {

      setFormData((prev) => ({

      ...prev,

      userId: selectedUser.userId,

      username: selectedUser.username,

      email: selectedUser.email,

      role: selectedUser.role

      }));
  }

}, [selectedUser]);



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };



  const handleSubmit = () => {
    console.log("Submitting:", formData);
    onSubmit(formData);
  };



  return (

    <div className="modal-overlay">

      <div className="modal-content">

        {/* =====================
            ADD PRODUCT
        ===================== */}

        {modalType === "addProduct" && (

          <>

            <h2>Add Product</h2>

            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />

            <input
              name="price"
              placeholder="Price"
              onChange={handleChange}
            />

            <input
              name="stock"
              placeholder="Stock"
              onChange={handleChange}
            />

            <input
              name="categoryId"
              placeholder="Category ID"
              onChange={handleChange}
            />

            <input
              name="imageUrl"
              placeholder="Image URL"
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
            />

          </>

        )}



        {/* =====================
            DELETE PRODUCT
        ===================== */}

        {modalType === "deleteProduct" && (

          <>

            <h2>Delete Product</h2>

            <input
              name="productId"
              placeholder="Product ID"
              onChange={handleChange}
            />

          </>

        )}


      {/* =====================
        VIEW USER DETAILS
        ===================== */}

          {modalType === "viewUser" && (

            <>

              <h2>View User Details</h2>

              {!response ? (

                <>
                  <input
                    type="number"
                    name="userId"
                    placeholder="Enter User ID"
                    value={formData.userId || ""}
                    onChange={handleChange}
                  />

                  <button onClick={handleSubmit}>
                    Submit
                  </button>
                </>

              ) : (

                <div className="user-details">

                  <p>
                    <strong>User ID:</strong>
                    {" "}
                    {response.userId}
                  </p>

                  <p>
                    <strong>Username:</strong>
                    {" "}
                    {response.username}
                  </p>

                  <p>
                    <strong>Email:</strong>
                    {" "}
                    {response.email}
                  </p>

                  <p>
                    <strong>Role:</strong>
                    {" "}
                    {response.role}
                  </p>

                </div>

              )}

              <button onClick={onClose}>
                Close
              </button>


            </>
          )}

        {/*=====================
            MODIFY USER
          ===================== */}

        {modalType === "modifyUser" && (

      <>

        <h2>Modify User</h2>

        {!selectedUser ? (
        <>

            <input
            type="number"
            name="userId"
            placeholder="Enter User ID"
            value={formData.userId || ""}
            onChange={handleChange}
          />

        </>

        ) : (
        <>
          <input
            type="text"
            name="username"
            placeholder="Username"
            
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            
            value={formData.email}
            onChange={handleChange}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >

            <option value="CUSTOMER">
              CUSTOMER
            </option>

            <option value="ADMIN">
              ADMIN
            </option>

          </select>

        </>

        )}

      </>
      )}


      {/* =====================
        MONTHLY BUSINESS
      ===================== */}

        {modalType === "monthlyBusiness" && (
          
         <>
           <h2>Monthly Business Report</h2>

            {!response ? (

            <>
            <input
            type="number"
            name="month"
            placeholder="Month"
            value={formData.month || ""}
            onChange={handleChange}
            />

            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year || ""}
              onChange={handleChange}
            />

            <button onClick={handleSubmit}>
                Submit
            </button>

            </>

  ) : (

    <div>

        <h3>
          Total Business :
          ₹{response.totalBusiness}
        </h3>

        <h4>Category Sales</h4>

      {Object.entries(
        response.categorySales
      ).map(([category, quantity]) => (

        <p key={category}>
          {category} : {quantity}
        </p>

      ))}

    </div>
  )}

  <button onClick={onClose}>
                Close
              </button>  
  </>
        )}

      {/* =====================
        DAILY BUSINESS
      ===================== */}

    {modalType === "dailyBusiness" && (

        <>

          <h2>Daily Business Report</h2>

          {!response ? (
              <>
              <input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleChange}
              />
                <button onClick={handleSubmit}>
                Submit
                </button>
              </>
            ) : (

              <div>

                <h3>
                  Total Business:
                  ₹{response.totalBusiness}
                </h3>

                <h4>Category Sales</h4>

                {Object.entries(
                  response.categorySales
                ).map(([category, quantity]) => (

                  <p key={category}>
                    {category} : {quantity}
                  </p>

                ))}

              </div>

            )}

            <button onClick={onClose}>
                Close
              </button>  

          </>

        )}



        {/* =====================
        YEARLY BUSINESS
      ===================== */}

    {modalType === "yearlyBusiness" && (

      <>

          <h2>Yearly Business Report</h2>

              {!response ? (
              <>
                <input
                  type="number"
                  name="year"
                  placeholder="Enter Year"
                  value={formData.year || ""}
                  onChange={handleChange}
                />
                <button onClick={handleSubmit}>
                  Submit
                </button>

              </>
              ) : (

                <div>

                  <h3>
                    Total Business:
                    ₹{response.totalBusiness}
                  </h3>

                  <h4>Category Sales</h4>

                  {Object.entries(
                    response.categorySales
                  ).map(([category, quantity]) => (

                    <p key={category}>
                      {category} : {quantity}
                    </p>

                  ))}

                </div>

              )}
              <button onClick={onClose}>
                Close
              </button>
            </>

          )}



          {modalType === "overallBusiness" && (

       <>

          <h2>Overall Business Report</h2>

                {!response ? (
                <>
                  <p>
                    Click Submit to fetch overall revenue.
                  </p>

                  <button onClick={handleSubmit}>
                    Submit
                  </button>
                </>
                ) : (

                  <div>

                    <h3>
                      Total Business:
                      ₹{response.totalBusiness}
                    </h3>

                    <h4>Category Sales</h4>

                    {Object.entries(
                      response.categorySales
                    ).map(([category, quantity]) => (

                      <p key={category}>
                        {category} : {quantity}
                      </p>

                    ))}

                  </div>

                )}
                <button onClick={onClose}>
                  Close
                </button>
              </>

            )}
                
        
   {/* =====================
   BUTTONS
  ===================== */}


    {modalType !== "viewUser" && modalType !== "monthlyBusiness" && modalType !== "dailyBusiness" &&  modalType !== "yearlyBusiness" &&
     modalType !== "overallBusiness" && (
        <div>

          <button onClick={handleSubmit}>
            Submit
          </button>

          <button
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

       )}


      </div>

    </div>
  )};

export default CustomModal;