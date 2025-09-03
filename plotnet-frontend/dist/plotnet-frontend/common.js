"use strict";
(self["webpackChunkplotnet_frontend"] = self["webpackChunkplotnet_frontend"] || []).push([["common"],{

/***/ 1142:
/*!*******************************************!*\
  !*** ./src/app/services/sales.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SalesService: () => (/* binding */ SalesService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);



class SalesService {
  constructor(http) {
    this.http = http;
    this.apiUrl = 'http://localhost:8080/api/sales';
    // Mock data for demonstration
    this.mockLeads = [{
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1234567890',
      source: 'website',
      status: 'qualified',
      interestedProperty: 'Green Valley Residency',
      budget: 6000000,
      assignedTo: 2,
      notes: 'Interested in corner plot with north facing',
      createdAt: new Date('2024-08-15'),
      updatedAt: new Date('2024-09-01')
    }, {
      id: 2,
      name: 'Emily Johnson',
      email: 'emily.j@email.com',
      phone: '+1234567891',
      source: 'referral',
      status: 'new',
      interestedProperty: 'Tech Park Commercial',
      budget: 8000000,
      assignedTo: 2,
      notes: 'Looking for commercial space for IT company',
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-09-01')
    }];
    this.mockDeals = [{
      id: 1,
      leadId: 1,
      propertyId: 1,
      plotId: 1,
      customerName: 'John Smith',
      dealValue: 6600000,
      status: 'agreement',
      associateId: 2,
      commission: 132000,
      paymentSchedule: [],
      documents: ['agreement.pdf', 'payment_plan.pdf'],
      createdAt: new Date('2024-09-01')
    }];
  }
  getLeads() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(this.mockLeads);
  }
  getLeadsByAssociate(associateId) {
    const leads = this.mockLeads.filter(l => l.assignedTo === associateId);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(leads);
  }
  createLead(lead) {
    const newLead = {
      id: Math.max(...this.mockLeads.map(l => l.id)) + 1,
      ...lead,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockLeads.push(newLead);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(newLead);
  }
  updateLead(id, lead) {
    const index = this.mockLeads.findIndex(l => l.id === id);
    if (index !== -1) {
      this.mockLeads[index] = {
        ...this.mockLeads[index],
        ...lead,
        updatedAt: new Date()
      };
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(this.mockLeads[index]);
    }
    throw new Error('Lead not found');
  }
  getDeals() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(this.mockDeals);
  }
  getDealsByAssociate(associateId) {
    const deals = this.mockDeals.filter(d => d.associateId === associateId);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(deals);
  }
  createDeal(deal) {
    const newDeal = {
      id: Math.max(...this.mockDeals.map(d => d.id)) + 1,
      ...deal,
      createdAt: new Date()
    };
    this.mockDeals.push(newDeal);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(newDeal);
  }
  updateDeal(id, deal) {
    const index = this.mockDeals.findIndex(d => d.id === id);
    if (index !== -1) {
      this.mockDeals[index] = {
        ...this.mockDeals[index],
        ...deal
      };
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(this.mockDeals[index]);
    }
    throw new Error('Deal not found');
  }
  static {
    this.ɵfac = function SalesService_Factory(t) {
      return new (t || SalesService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: SalesService,
      factory: SalesService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=common.js.map