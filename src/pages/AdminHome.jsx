import { useState } from "react";


import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import CustomModal from "../components/Admin/CustomModal";
import { addProduct, deleteProduct, getUserById, updateUser, getMonthlyBusiness } from "../services/adminService";

import "../components/Admin/Admin.css";

function AdminHome() {

  

  const [modalType, setModalType] = useState(null);

  const [response, setResponse] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  

  const cardData = [

    {
      title: "Add Product",
      description:
        "Create and manage new product listings",
      team: "Product Management",
      modalType: "addProduct"
    },

    {
      title: "Delete Product",
      description:
        "Remove products from inventory",
      team: "Product Management",
      modalType: "deleteProduct"
    },

    {
      title: "View User Details",
      description:
        "Fetch user information",
      team: "User Management",
      modalType: "viewUser"
    },

    {
      title: "Modify User",
      description:
        "Update user details and roles",
      team: "User Management",
      modalType: "modifyUser"
    },

    {
      title: "Monthly Business",
      description:
        "View monthly revenue metrics",
      team: "Business Analytics",
      modalType: "monthlyBusiness"
    },

    {
      title: "Daily Business",
      description:
        "View daily revenue metrics",
      team: "Business Analytics",
      modalType: "dailyBusiness"
    },

    {
      title: "Yearly Business",
      description:
        "View yearly revenue metrics",
      team: "Business Analytics",
      modalType: "yearlyBusiness"
    },

    {
      title: "Overall Business",
      description:
        "View overall revenue",
      team: "Business Analytics",
      modalType: "overallBusiness"
    }
  ];


  //============================
  // ADD PRODUCT  ==========>
  //============================

    const handleAddProductSubmit = async (productData) => {

  try {

    const response = await addProduct({

      name: productData.name,

      description: productData.description,

      price: Number(productData.price),

      stock: Number(productData.stock),

      categoryId: Number(productData.categoryId),

      imageUrl: productData.imageUrl
    });

    alert("Product Added Successfully");

    console.log(response.data);

    setModalType(null);

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
};

  //============================
  // DELETE PRODUCT  ==========>
  //============================

    const handleDeleteProductSubmit = async (data) => {

  try {

    await deleteProduct(Number(data.productId));

    alert("Product Deleted Successfully");

    setModalType(null);

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
};
    //============================
    // VIEW USER DETAIL ==========>
    //============================

    const handleViewUserSubmit = async (data) => {

  try {

    const result = await getUserById(data.userId);

    setResponse(result.data);

  } catch (error) {

    console.error(error);

    alert(error.message);

  }
};
    //============================
    // MODIFY USER  ===========>
    //============================

  const handleModifyUserFetch = async (data) => {
      // console.log("DATA RECEIVED:", data);
      // console.log("USER ID:", data.userId);
  try {

    const result = await getUserById(data.userId);

    setSelectedUser(result.data);

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
};
              // UPDATE USER DETAILS=======>

  const handleModifyUserUpdate = async (userData) => {
    console.log("UPDATE DATA:", userData);
  try {

    await updateUser(userData);

    alert("User Updated Successfully");

    setSelectedUser(null);

    setModalType(null);

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
};

    //============================
    // GET MONTHLY BUSINESS DETAIL ==========>
    //============================

  const handleMonthlyBusiness = async (data) => {

  try {

    const response = await fetch(

      `http://localhost:9090/admin/business/monthly?month=${data.month}&year=${data.year}`,

      {
        method: "GET",
        credentials: "include"
      }
    );

    if (!response.ok) {

      const errorMessage =
        await response.text();

      throw new Error(errorMessage);
    }

    const result =
      await response.json();

    setResponse(result);

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
};

    //============================
    // GET DAILY BUSINESS DETAIL ==========>
    //============================

    const handleDailyBusiness = async (data) => {

     try {

      const response = await fetch(

      `http://localhost:9090/admin/business/daily?date=${data.date}`,

      {
        method: "GET",
        credentials: "include"
      }
    );

    if (!response.ok) {

      const errorMessage =
        await response.text();

      throw new Error(errorMessage);
    }

    const result =
      await response.json();

    setResponse(result);

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
};

    //============================
    // GET YEARLY BUSINESS DETAIL ==========>
    //============================

    const handleYearlyBusiness = async (data) => {

      try {

        const response = await fetch(

        `http://localhost:9090/admin/business/yearly?year=${data.year}`,

                {
                  method: "GET",
                  credentials: "include"
                }
              );

              if (!response.ok) {

                const errorMessage =
                  await response.text();

                throw new Error(errorMessage);
              }

              const result =
                await response.json();

              setResponse(result);

            } catch (error) {

              console.error(error);

              alert(error.message);
            }
          };


     //============================
    // GET YEARLY BUSINESS DETAIL ==========>
    //============================

      const handleOverallBusiness = async () => {

        try {

            const response = await fetch(

            "http://localhost:9090/admin/business/overall",

                  {
                    method: "GET",
                    credentials: "include"
                  }
                );

                if (!response.ok) {

                  const errorMessage =
                    await response.text();

                  throw new Error(errorMessage);
                }

                const result =
                  await response.json();

                setResponse(result);

              } catch (error) {

                console.error(error);

                alert(error.message);
              }
            };


  return (

    <div className="admin-dashboard">

      <Header
      username="Admin"
      isAdmin={true}
      />



      <main className="dashboard-content">

        <h1 className="dashboard-title">
          Admin Dashboard
        </h1>



        <div className="cards-grid">

          {cardData.map((card, index) => (

            <div

              key={index}

              className="admin-card"

              onClick={() =>
                setModalType(
                  card.modalType
                )
              }

            >

              <h3>
                {card.title}
              </h3>

              <p>
                {card.description}
              </p>

              <span>
                {card.team}
              </span>

            </div>

          ))}

        </div>
      </main>



      {modalType && (

  <CustomModal

    modalType={modalType}

    response={response}
    selectedUser={selectedUser}
    onClose={() => {
      setModalType(null);
      setResponse(null);
    }}

    onSubmit={(data) => {

      if (modalType === "addProduct") {

        handleAddProductSubmit(data);

      }

      if (modalType === "deleteProduct") {

        handleDeleteProductSubmit(data);

      }

      if (modalType === "viewUser") {

        handleViewUserSubmit(data);

      }

      if (modalType === "modifyUser") {

       if (!selectedUser) {
        handleModifyUserFetch(data)
      } else {
        handleModifyUserUpdate(data);
      }
    }

      if (modalType === "monthlyBusiness") {
        handleMonthlyBusiness(data);
      }

      if (modalType === "dailyBusiness") {
         handleDailyBusiness(data);
        }

      if (modalType === "yearlyBusiness") {
          handleYearlyBusiness(data);
        }

        if (modalType === "overallBusiness") {
          handleOverallBusiness();
          }

    }}

          />

      )}


      <Footer />

    </div>
  );
}

export default AdminHome;