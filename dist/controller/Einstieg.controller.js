sap.ui.define([
	"de/pfalzwerke/controller/BaseController",
	 "sap/m/MessageToast"
], function(BaseController , MessageToast ) {
	"use strict";

	return BaseController.extend("de.pfalzwerke.controller.Einstieg", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf de.pflazwerke.view.Einstieg
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf de.pflazwerke.view.Einstieg
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf de.pflazwerke.view.Einstieg
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf de.pflazwerke.view.Einstieg
		 */
		//	onExit: function() {
		//
		//	}
		
		onWeiter: function (event) {
			this.getRouter().navTo("View_Erfassung");
			//MessageToast.show(evt.getSource().getId() + " Pressed");
		}

	});

});