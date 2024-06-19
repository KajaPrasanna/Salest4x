sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
function (Controller,Fragment,JSONModel,Filter,FilterOperator) {
    "use strict";

    return Controller.extend("com.sales.salesprice.controller.MainView", {
        onInit: function () {
			var osalesModel = new JSONModel();
			this.getView().setModel(osalesModel,"oSalesModel")
        },

        onSalesValueHelp: function () {
        // var sInputValue = oEvent.getSource().getValue();   
			var oView = this.getView();

			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "com.sales.salesprice.view.SalesOrganization",
					controller: this
				}).then(function (oValueHelpDialog){
					oView.addDependent(oValueHelpDialog);
					return oValueHelpDialog;
				});
			}
			this._pValueHelpDialog.then(function(oValueHelpDialog){
			//  	this._configValueHelpDialog();
			  	oValueHelpDialog.open();
			  }.bind(this));
            // oValueHelpDialog.open(sInputValue);
            // });     
		},

        onSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("SalesOrganization", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getParameter("itemsBinding");
			oBinding.filter([oFilter]);
		},

        onValueHelpDialogClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem").getTitle();
				// oInput = this.byId("productInput");

			if (!oSelectedItem) {
				// oInput.resetProperty("value");
				return;
			}
            // this.byId("productInput").setValue(oSelectedItem.getTitle());
			this.byId("productInput").setValue(oSelectedItem);
            var salesCode =oSelectedItem;
            this.getView().getModel("oSalesModel").setProperty("/salesCode",salesCode);
			this.onDistributionChannel(oSelectedItem);
            
		},

		onDistributionChannel: function(oEvent){
			// var oSelectedItem = oEvent.getParameter("selectedItem").getDescription();
			var oModel = this.getOwnerComponent().getModel("ZDISTRIBUTIONCHANNEL_CDS");
			var oJSONModel = new sap.ui.model.json.JSONModel();
			var oFilter = new sap.ui.model.Filter("SalesOrganization","EQ",oEvent);
			oModel.read("/ZDistributionChannel",{
				// Filter:[
				// 	new Filter({
				// 		path: "SalesOrganization",
				// 		operator: FilterOperator.EQ,
				// 		value1: oEvent
				// 	})
				// ],
				filters: [oFilter],
				success: function(response){
					oJSONModel.setData(response.results);
					this.getView().setModel(oJSONModel,"DistModel")
				}.bind(this),
				error: function(error){
				}
			})
		},

		onDistValueHelp:function(oEvent){
			// var sInputValue = oEvent.getSource().getValue();   
			var oView = this.getView();

			if (!this._pValueHelpDialog1) {
				this._pValueHelpDialog1 = Fragment.load({
					id: oView.getId(),
					name: "com.sales.salesprice.view.DistributionChannel",
					controller: this
				}).then(function (oValueHelpDialog1){
					oView.addDependent(oValueHelpDialog1);
					return oValueHelpDialog1;
				});
			}
			this._pValueHelpDialog1.then(function(oValueHelpDialog1){
			//  	this._configValueHelpDialog();
			  	oValueHelpDialog1.open();
			  }.bind(this));
            // oValueHelpDialog.open(sInputValue);
            // });
		},

		onSearch1: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("DistributionChannel", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getParameter("itemsBinding");
			oBinding.filter([oFilter]);
		},

		onDistValueHelpDialogClose: function(oEvent){
			var oSelectedItem1 = oEvent.getParameter("selectedItem").getTitle();
				// oInput = this.byId("DistChannel_id");

			if (!oSelectedItem1) {
				// oInput.resetProperty("value");
				return;
			}

			this.byId("DistChannel_id").setValue(oSelectedItem1);
			this.getView().getModel("oSalesModel").setProperty("/oDistValue",oSelectedItem1);
			this.ongetDivision(oSelectedItem1);
			this.ongetPlant(oSelectedItem1);
			this.ongetOffer(oSelectedItem1);
		},

		ongetDivision: function(oEvent){
			// var oSelectedItem = oEvent.getParameter("selectedItem").getDescription();
			var salesCode = this.getView().getModel("oSalesModel").getData().salesCode;
			var oModel = this.getOwnerComponent().getModel("ZDIVISIONLIST_CDS");
			var oJSONModel = new sap.ui.model.json.JSONModel();
			var oFilter = new sap.ui.model.Filter("SalesOrganization","EQ",salesCode);
			var oFilter1 = new sap.ui.model.Filter("DistributionChannel","EQ",oEvent);
			var oFil = new sap.ui.model.Filter({
				filters: [oFilter,oFilter1],
				and: true
			})
			oModel.read("/ZDivisionList",{
				filters: [oFil],
				success: function(response){
					oJSONModel.setData(response.results);
					this.getView().setModel(oJSONModel,"DivisionModel")
				}.bind(this),
				error: function(error){
				}
			})
		},

		onDivisionValueHelp:function(oEvent){
			// var sInputValue = oEvent.getSource().getValue();   
			var oView = this.getView();

			if (!this._pValueHelpDialog2) {
				this._pValueHelpDialog2 = Fragment.load({
					id: oView.getId(),
					name: "com.sales.salesprice.view.Division",
					controller: this
				}).then(function (oValueHelpDialog2){
					oView.addDependent(oValueHelpDialog2);
					return oValueHelpDialog2;
				});
			}
			this._pValueHelpDialog2.then(function(oValueHelpDialog2){
			//  	this._configValueHelpDialog();
			  	oValueHelpDialog2.open();
			  }.bind(this));
            // oValueHelpDialog.open(sInputValue);
            // });
		},

		onSearch2: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Division", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getParameter("itemsBinding");
			oBinding.filter([oFilter]);
		},

		onDivisionValueHelpDialogClose: function(oEvent){
			var oSelectedItem2 = oEvent.getParameter("selectedItem").getTitle();
				// oInput = this.byId("DistChannel_id");

			if (!oSelectedItem2) {
				// oInput.resetProperty("value");
				return;
			}
			// this.getView().getModel("oSalesModel").setProperty("/oDivisionValue",oSelectedItem2)
			this.byId("Division_id").setValue(oSelectedItem2);
			this.ongetCustomer(oSelectedItem2);
		},

		ongetPlant: function(oEvent){
			var salesCode = this.getView().getModel("oSalesModel").getData().salesCode;
			var oModel = this.getOwnerComponent().getModel("ZPlantList_cds");
			var oJSONModel = new sap.ui.model.json.JSONModel();
			var oFilter = new sap.ui.model.Filter("SalesOrganization","EQ",salesCode);
			var oFilter1 = new sap.ui.model.Filter("DistributionChannel","EQ",oEvent);
			var oFil = new sap.ui.model.Filter({
				filters: [oFilter,oFilter1],
				and: true
			})
			oModel.read("/ZPLANTLIST",{
				filters: [oFil],
				success: function(response){
					oJSONModel.setData(response.results);
					this.getView().setModel(oJSONModel,"PlantModel")
				}.bind(this),
				error: function(error){
				}
			})
		},

		onPlantValueHelp:function(oEvent){
			// var sInputValue = oEvent.getSource().getValue();   
			var oView = this.getView();

			if (!this._pValueHelpDialog3) {
				this._pValueHelpDialog3 = Fragment.load({
					id: oView.getId(),
					name: "com.sales.salesprice.view.Plant",
					controller: this
				}).then(function (oValueHelpDialog3){
					oView.addDependent(oValueHelpDialog3);
					return oValueHelpDialog3;
				});
			}
			this._pValueHelpDialog3.then(function(oValueHelpDialog3){
			//  	this._configValueHelpDialog();
			  	oValueHelpDialog3.open();
			  }.bind(this));
            // oValueHelpDialog.open(sInputValue);
            // });
		},

		onSearch3: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Plant", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getParameter("itemsBinding");
			oBinding.filter([oFilter]);
		},

		onPlantValueHelpDialogClose: function(oEvent){
			var oSelectedItem3 = oEvent.getParameter("selectedItem").getTitle();
				// oInput = this.byId("DistChannel_id");

			if (!oSelectedItem3) {
				// oInput.resetProperty("value");
				return;
			}
			
			this.byId("Plant_id").setValue(oSelectedItem3);
						
		},

		ongetCustomer: function(oEvent){
			// var oSelectedItem = oEvent.getParameter("selectedItem").getDescription();
			var salesCode = this.getView().getModel("oSalesModel").getData().salesCode;
			var DistValue = this.getView().getModel("oSalesModel").getData().oDistValue;
			// var DivisionValue = this.getView().getModel("oSalesModel").getData().oDivisionValue;
			var oModel = this.getOwnerComponent().getModel("ZCUSTOMERLIST_CDS");
			var oJSONModel = new sap.ui.model.json.JSONModel();
			var oFilter = new sap.ui.model.Filter("SalesOrganization","EQ",salesCode);
			var oFilter1 = new sap.ui.model.Filter("DistributionChannel","EQ",DistValue);
			var oFilter2 = new sap.ui.model.Filter("Division","EQ",oEvent)
			var oFil1 = new sap.ui.model.Filter({
				filters: [oFilter,oFilter1,oFilter2],
				and: true
			})
			oModel.read("/ZCustomerList",{
				filters: [oFil1],
				success: function(response){
					oJSONModel.setData(response.results);
					this.getView().setModel(oJSONModel,"CustomerModel")
				}.bind(this),
				error: function(error){
				}
			})
		},

		onCustomerValueHelp:function(oEvent){
			// var sInputValue = oEvent.getSource().getValue();   
			var oView = this.getView();

			if (!this._pValueHelpDialog4) {
				this._pValueHelpDialog4 = Fragment.load({
					id: oView.getId(),
					name: "com.sales.salesprice.view.Customer",
					controller: this
				}).then(function (oValueHelpDialog4){
					oView.addDependent(oValueHelpDialog4);
					return oValueHelpDialog4;
				});
			}
			this._pValueHelpDialog4.then(function(oValueHelpDialog4){
			//  	this._configValueHelpDialog();
			  	oValueHelpDialog4.open();
			  }.bind(this));
            // oValueHelpDialog.open(sInputValue);
            // });
		},

		onSearch4: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("CustomerId", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getParameter("itemsBinding");
			oBinding.filter([oFilter]);
		},

		onCustomerValueHelpDialogClose: function(oEvent){
			var oSelectedItem4 = oEvent.getParameter("selectedItem").getTitle();
				// oInput = this.byId("DistChannel_id");

			if (!oSelectedItem4) {
				// oInput.resetProperty("value");
				return;
			}
			
			this.byId("Customer_id").setValue(oSelectedItem4);			
		},

		ongetOffer: function(oEvent){
			var salesCode = this.getView().getModel("oSalesModel").getData().salesCode;
			var oModel = this.getOwnerComponent().getModel("ZOFFERINGNAME_CDS");
			var oJSONModel = new sap.ui.model.json.JSONModel();
			var oFilter = new sap.ui.model.Filter("SalesOrganization","EQ",salesCode);
			var oFilter1 = new sap.ui.model.Filter("DistributionChannel","EQ",oEvent);
			var oFil = new sap.ui.model.Filter({
				filters: [oFilter,oFilter1],
				and: true
			})
			oModel.read("/ZOfferingName",{
				filters: [oFil],
				success: function(response){
					oJSONModel.setData(response.results);
					this.getView().setModel(oJSONModel,"OfferingModel")
				}.bind(this),
				error: function(error){
				}
			})
		},

		onOfferValueHelp:function(oEvent){
			// var sInputValue = oEvent.getSource().getValue();   
			var oView = this.getView();

			if (!this._pValueHelpDialog5) {
				this._pValueHelpDialog5 = Fragment.load({
					id: oView.getId(),
					name: "com.sales.salesprice.view.Offering",
					controller: this
				}).then(function (oValueHelpDialog5){
					oView.addDependent(oValueHelpDialog5);
					return oValueHelpDialog5;
				});
			}
			this._pValueHelpDialog5.then(function(oValueHelpDialog5){
			//  	this._configValueHelpDialog();
			  	oValueHelpDialog5.open();
			  }.bind(this));
            // oValueHelpDialog.open(sInputValue);
            // });
		},

		onSearch5: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("OfferingId", FilterOperator.Contains, sValue);
			var oFilter1 = new Filter("OfferingName",FilterOperator.Contains, sValue)
			var oBinding = oEvent.getParameter("itemsBinding");
			oBinding.filter([oFilter, oFilter1]);
		},

		onOfferingValueHelpDialogClose: function(oEvent){
			var oSelectedItem5 = oEvent.getParameter("selectedItem").getTitle();
				// oInput = this.byId("DistChannel_id");

			if (!oSelectedItem5) {
				// oInput.resetProperty("value");
				return;
			}
			
			this.byId("Offering_id").setValue(oSelectedItem5);
						
		},

		onSelectedChange: function(oEvent){
			var offeringName = oEvent.getParameter("selectedItem").getText()
			var OfferName = this.getView().byId("OfferName").setValue(offeringName)
	    },

    });
});
