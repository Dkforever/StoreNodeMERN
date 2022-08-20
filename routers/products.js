const express = require("express");
const { registerAadmin, loginAdmin, adminLogout } = require("../controller/admincontroller");
const { createCategories, categoryList, updateCategories, deleteCategories, addCategorie } = require("../controller/allcategory");
const { createBrand, addnewmodel, removemodel, brandModel, brandList, updateBrand } = require("../controller/brandcontroller");
const { createCampaign, getcampaignList, campaignDetail, updateCampaign, deleteCampaign, createCampaignReview, getCampaigntReviews, deleteReview } = require("../controller/campaign");
const {createColor, colorList, updateColor, deleteColor} = require("../controller/colorcontroller");
const { registerCustomer, getallUsers, getuserDetail, updateUser, deleteUser, loginUser, logoutCustomer, validateCoupon, getallTechnician } = require("../controller/custome");
const { newjoin, getjoinedcampDetail, getAlljoinedcamp } = require("../controller/joincampaign");
const { newOrder, getSingleOrder, myOrders, getallOrders, updateOrderStatus, deleteOrder } = require("../controller/orderController");
const {
  getProduct,
  createProduct,
  addModel,
  getallProducts,
  getallModel,
  getmodelname,
  deleteProduct,
  getProductDetail,
  allcategory,
  updateproduct,
} = require("../controller/productcontroller");
const {
  createstore,
  getallStore,
  getStoreDetail,
  updateStore,
  deleteStore,
} = require("../controller/storecontroller");
const { registerTechnician,loginTechnician, logouttechnician, deleteTechnician, updateTechnician } = require("../controller/technician");

const { isAuthenticatedAdmin } = require("../middleware/auth");
const { isAuthenticatedCustomer, authorizeRoles } = require("../middleware/authcustomer");

const router = express.Router();

//  product router 
router.route("/product").get(getProduct);
router.route("/product/new").post(isAuthenticatedAdmin,createProduct);
router.route("/product/model").post(addModel);
router.route("/product/all").get(getallProducts);
router.route("/product/allcateogry").get(allcategory);
router.route("/product/detail/:id").get(getProductDetail);
router.route("/product/modelList").get(getallModel);
router.route("/product/modelname").get(getmodelname);
router.route("/product/deleteProduct/:id").delete(deleteProduct);
router.route("/product/updateProduct/:id").put(updateproduct);


// admin
router.route("/product/register").post(registerAadmin);
router.route("/product/adminlogin").post(loginAdmin);
router.route("/product/adminlogout").post(adminLogout);



// Store API URL
router.route("/product/addstore").post(createstore);

router.route("/product/sotres").get(isAuthenticatedAdmin, getallStore);

router.route("/product/sotresdetail/:id").get(getStoreDetail);
router.route("/product/updateStore/:id").put(updateStore);
router.route("/product/deleteStore/:id").delete(deleteStore);

// technician API URL
router.route("/product/TechnicianRegister").post(registerTechnician);
router.route("/product/loginTechnician").post(loginTechnician);
router.route("/product/logoutTechnician").post(logouttechnician);
router.route("/product/updateTehnician/:id").put(updateTechnician);
router.route("/product/deleteTechnician/:id").delete(deleteTechnician);





// Campaign API URL
router.route("/product/addcampaign").post(isAuthenticatedAdmin,createCampaign);
router.route("/product/campaign").get(getcampaignList);
router.route("/product/campaigndetail/:id").get(campaignDetail);
router.route("/product/updateCampaign/:id").put(updateCampaign);
router.route("/product/deleteCampaign/:id").delete(deleteCampaign);

router.route("/product/campaignreview").put(isAuthenticatedCustomer, authorizeRoles ("user") ,createCampaignReview);
router.route("/product/getcampaignreview").get(getCampaigntReviews);
router.route("/product/deletereview").delete(deleteReview);




// Customer/ User or Technician API Api URL
router.route("/product/customerRegister").post(registerCustomer);
router.route("/product/listuser").get(getallUsers);
router.route("/product/listTechnician").get(getallTechnician);

router.route("/product/userdetail/:id").get(getuserDetail);
router.route("/product/updateuser/:id").put(updateUser);
router.route("/product/deleteuser/:id").delete(deleteUser);
router.route("/product/userlogin").post(loginUser);
router.route("/product/logoutCustomer").post(logoutCustomer);

router.route("/product/validatecoupon/:id").post(validateCoupon);




// order API URL
router.route("/product/neworder").post(newOrder);
router.route("/product/allorders").get(getallOrders);
router.route("/product/orders/:id").get(getSingleOrder);
router.route("/product/me").get(myOrders);

router.route("/product/order/:id").put(updateOrderStatus);
router.route("/product/order/:id").delete(deleteOrder);


// Category API url 
router.route("/product/category").post(createCategories);
router.route("/product/categoryList").get(categoryList);
router.route("/product/updatecategory/:id").put(updateCategories);
router.route("/product/deletecategory/:id").delete(deleteCategories);
//router.route("/product/addcategory").post(addCategorie);

// brand api url 
router.route("/product/newbrand").post(createBrand);
router.route("/product/newmodel").post(addnewmodel);


router.route("/product/removemodel").put(removemodel);
router.route("/product/brandlist").get(brandList);
router.route("/product/brandmodel/:id").get(brandModel);



// join campaign api url 
router.route("/product/newjoin").post(isAuthenticatedCustomer, authorizeRoles("technician"), newjoin);
router.route("/product/campjoined/:id").get(getjoinedcampDetail);
router.route("/product/alljoinedcamp").get(getAlljoinedcamp);


// color Api 
router.route("/product/addcolor").post(createColor);
router.route("/product/listcolor").get(colorList);
router.route("/product/updatecolor/:id").put(updateColor);
router.route("/product/deletecolor/:id").delete(deleteColor);






module.exports = router;
