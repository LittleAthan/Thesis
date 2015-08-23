var yourApp = angular.module('WareHouse', ['onsen.directives']);

yourApp.run(function ($rootScope) {
    $rootScope.rowid = '';
    //$rootScope.IP = 'http://192.168.1.2/mobile/';
    $rootScope.IP = 'http://83.212.125.89/mobile/';
});

yourApp.controller("clientToOrderController", ['$scope', '$rootScope', '$sce', '$http', function ($scope, $rootScope, $sce, $http) {
    
}]);

yourApp.controller("menuController", ['$scope', '$rootScope', '$sce', '$http', function ($scope, $rootScope, $sce, $http) {
    $scope.ons.navigator.getDeviceBackButtonHandler().disable();
    $scope.profile = function () {
        $http.post($rootScope.IP + 'profile.php', { 'rowid': $rootScope.rowid }).
            success(function (data, status, headers, config) {
                $scope.profileLastName = data.lastname;
                $scope.profileFirstName = data.firstname;
                $scope.profileEmail = data.email;
                $scope.profileSignature = data.signature;
                $scope.profileOffice_phone = data.office_phone;
                $scope.profileOffice_fax = data.office_fax;
                $scope.profileUser_mobile = data.user_mobile;
                $scope.profileLogin = data.login;
                $scope.profileDateCreate = data.datec;
                $scope.profileDateModified = data.tms;
                $scope.profileDatelastlogin = data.datelastlogin;
                $scope.profileDatepreviouslogin = data.datepreviouslogin;
                $scope.profilePhoto = data.photo;


                console.log(data);
            }).
            error(function (data, status, headers, config) {
                alert(data);
            })
    };

    $scope.companyProfile = function () {
        $http.post($rootScope.IP + 'company.php', { 'rowid': $rootScope.rowid }).
            success(function (data, status, headers, config) {
                $scope.cName = data.cName;
                $scope.cAddress = data.cAddress;
                $scope.cTK = data.cTK;
                $scope.cTown = data.cTown;
                $scope.cState = data.cState;
                $scope.cCorency = data.cCorency;
                $scope.cPhone = data.cPhone;
                $scope.cFax = data.cFax;
                $scope.cEmail = data.cEmail;
                $scope.cUrl = data.cUrl;
                $scope.clogo = data.clogo;
                $scope.cNote = data.cNote;
                $scope.cManager = data.cManager;
                $scope.cLibelle = data.cLibelle;
                $scope.cTVA = data.cTVA;
                $scope.cSiret = data.cSiret;
                $scope.cMonth = data.cMonth;


                console.log(data);
            }).
            error(function (data, status, headers, config) {
                alert(data);
            })
    };

    $scope.clients = function () {
        $http.post($rootScope.IP + 'clients.php', { 'rowid': $rootScope.rowid }).
            success(function (data, status, headers, config) {

                $scope.clients = data;
                
                console.log(data);
            }).
            error(function (data, status, headers, config) {
                alert(data);
            })
    };

    $scope.clientToOrder = function (clRowId) {
        console.log(clRowId);
        $http.post($rootScope.IP + 'clientPrfile.php', { 'clRowId': clRowId }).
            success(function (data, status, headers, config) {

                $scope.client = data.client;
                $scope.clLogo = data.client.logo;
                $scope.clName = data.client.name;
                $scope.clType = data.client.forme_juridique;
                if (data.salesMan.length<3) {
                    $scope.salesMan = data.salesMan;
                }
                else {
                    for (var i = 0; i < 3; i++) {
                        $scope.salesMan[i] = data.salesMan[i];
                    }
                }
                $scope.clfax = data.client.fax;
                $scope.clphone = data.client.phone;
                $scope.clemail = data.client.email;
                $scope.clurl = data.client.url;
                $scope.claddress = data.client.address;
                $scope.clzip = data.client.zip;
                $scope.cltown = data.client.town;
                $scope.clstate = data.client.state;
                $scope.clafm = data.client.tva_intra;
                if (data.client.tva_assuj==1) {
                    $scope.clfpa = 'Ναι';
                }
                else {
                    $scope.clfpa = 'Όχι';
                }
                $scope.clekpt = data.client.remise_client;

                console.log(data);
            })
    };
    
    $scope.newOrder = function (clRowId) {
        
        var order = {
            Code: $scope.product.Code,
            Livraison: $scope.product.Livraison,
            NotesPub: $scope.product.NotesPub,
            NotesPer: $scope.product.NotesPer,
            Cond: $scope.product.Cond,
            mode: $scope.product.mode,
            Avail: $scope.product.Avail,
            product: [{}]
        };
        
        var newProduct = [];
        for (var i = 0; i < $scope.product.length; i++) {
            newProduct.push({
                    id: $scope.product[i].product.id,
                    quantity: $scope.product[i].product.quantity,
                    price: $scope.product[i].price,
                    type: $scope.product[i].type,
            });
        }       

        order.product = newProduct;

        $http.post($rootScope.IP + 'newOrder.php', { 'clRowId': clRowId, 'userId': $rootScope.rowid, 'order': order }).
            success(function (data, status, headers, config) {

                $scope.Show = data;
                alert($scope.Show);
                $scope.ons.navigator.pushPage('menu.html');
            }).
            error(function (data, status, headers, config) {
                alert(data);
            })
    };


    $scope.getProduct = function () {
        $http.post($rootScope.IP + 'product.php', '').
            success(function (data, status, headers, config) {

                $scope.product = data;

            }).
            error(function (data, status, headers, config) {
                alert(data);
            })
    };

    $scope.AppExit = function () {
        navigator.app.exitApp();
    };
}]);

yourApp.controller("LogInController", ['$scope', '$rootScope', '$sce', '$http', function ($scope, $rootScope, $sce, $http) {
    $scope.errors = [];
    $scope.msgs = [];
    $scope.login = function (user, pwd) {
        
        //user = 'Little Athan';
        //pwd = 'G@mat0sa';

        $scope.errors.splice(0, $scope.errors.length); // remove all error messages
        $scope.msgs.splice(0, $scope.msgs.length);
        $http.post($rootScope.IP + 'login.php', { 'u': user, 'p': pwd }).
       success(function (data, status, headers, config) {
           console.log(user + ' + ' + data.user + ' + ' + (data.user != user));
           if (typeof user === "undefined" || typeof data.id === "undefined") {
               alert('Παρακαλώ Ελέγξτε Τα Στοιχεία Συνδεσής Σας');
               //$scope.ons.navigator.pushPage('index.html');
           }
           else {
               $rootScope.rowid = data.id;
               $scope.mainUname = data.user;
               $scope.mainLastname = data.lastname;
               $scope.mainFirstname = data.firstname;
               $scope.mainDatelastlogin = data.datelastlogin;
               $scope.mainDatepreviouslogin = data.datepreviouslogin;
               $scope.mainDatec = data.datec;
               //console.log(data);

               //$scope.showStockAlert = '';
               //for (var i = 0; i < data[0].lableBPA.length; i++) {
               //    $scope.showStockAlert += '<tr><td align="left" width="40%">' + data[0].lableBPA[i] + '</td>';
               //    $scope.showStockAlert += '<td align="center" width="30%">' + data[0].priceBPA[i] + ' &euro; ' + data[0].priceTypeBPA[i] + '</td>';
               //    $scope.showStockAlert += '<td align="right" width="25%">' + data[0].stockBPA[i] + '</td><td width="5%"></td></tr>';
               //}
               //$scope.showshowStockAlertSafe = $sce.trustAsHtml($scope.showStockAlert);



               console.log(data);
               $scope.ons.navigator.getDeviceBackButtonHandler().disable();
               $scope.ons.setDefaultDeviceBackButtonListener(function () {
                   if ($scope.ons.navigator.notification.confirm("Are you sure to close the app?",
                     function (index) {
                       if (index === 1) { // OK button
                          $scope.ons.navigator.app.exitApp(); // Close the app
                   }
                   }
                   ));
               });
               $scope.ons.navigator.pushPage('menu.html');
               
           }
       }).
       error(function (data, status, headers, config) {
           alert("Αδύνατη Σύνδεση");
       });

    }


}]
);