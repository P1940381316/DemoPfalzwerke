sap.ui.define([
	'jquery.sap.global',
	"de/pfalzwerke/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	'sap/m/MessageBox'
], function(jQuery, BaseController, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("de.pfalzwerke.controller.View_Erfassung", {

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: true,
					delay: 0
				});

			//	this.getRouter().getRoute("view_Erfassung").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "view_Erfassung");
			/*this.getOwnerComponent().getModel().metadataLoaded().then(function () {
					// Restore original busy indicator delay for the object view
					oViewModel.setProperty("/delay", iOriginalBusyDelay);
				}
			);*/
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then(function() {
				var sObjectPath = this.getModel().createKey("ProductSet", {
					ProductID: sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},

		onCancel: function(oEvent) {
			this.getRouter().navTo("Einstieg");
		},

		handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response");
			if (sResponse) {
				var sMsg = "Datei erfolgreich hochgeladen";
				/*var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
				if (m[1] == "200") {
					sMsg = "Return Code: SUCCESS Upload Success";
					oEvent.getSource().setValue("");
				} else {
					sMsg = "Return Code: ERROR Upload Error";
				}
 
*/
				MessageToast.show(sMsg);
			}
		},

		handleUploadPress: function(oEvent) {
			var oFileUploader = this.getView().byId("fileUploader");
			if (!oFileUploader.getValue()) {
				MessageToast.show("Wähle eine Datei!");
				return;
			}
			oFileUploader.upload();
		},

		handleTypeMissmatch: function(oEvent) {
			var aFileTypes = oEvent.getSource().getFileType();
			jQuery.each(aFileTypes, function(key, value) {
				aFileTypes[key] = "*." + value;
			});
			var sSupportedFileTypes = aFileTypes.join(", ");
			MessageToast.show("Der Datei Typ *." + oEvent.getParameter("fileType") +
				" wird nicht untersützt. Bitte wählen sie einen der folgenden: " +
				sSupportedFileTypes);
		},

		handleValueChange: function(oEvent) {
			MessageToast.show("Klick 'Datei Hochladen' zum hochladen '" +
				oEvent.getParameter("newValue") + "'");
		},
		
		handleConfirmationMessageBoxPress: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.confirm(
				"Daten einreichen?", {
					styleClass: bCompact ? "sapUiSizeCompact sapUiResponsiveMargin" : "",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose:  function(sResult) {
						if (sResult === sap.m.MessageBox.Action.YES) {
							MessageToast.show("Daten erfolgreich eingereicht an Sabine Muster");
						}

					}
				}
			);
		}
	});
});