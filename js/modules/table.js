var tableModule = (function(window, $) {

    var TABLE_CONFIG = {
        ajax: {
            url: "empty.json",
            dataSrc: ""
        },
        dom: '<"table-buttons"<"table-buttons"Bf>l>t<"table-buttons"ip>',
        oLanguage: {
            sSearch: "Search results:"
        },
        buttons: [{ extend: 'colvis', text: 'Show Columns'}],
        fixedHeader: {
            header: true,
            footer: true
        },
        columns: [{
            data: "incident_number",
            title: "Incident#",
            name: "incident_number",
            visible: false
        }, {
            data: "incident_date",
            title: "Date",
            name: "incident_date",
            render: function(data, type, row, meta) {
                return moment(data).format('l')
            }
        }, {
            data: "incident_datetime",
            title: "Time",
            name: "incident_datetime",
            visible: false
        }, {
            data: "analysis_neighborhood",
            title: "Address",
            name: "analysis_neighborhood",
            visible: false
        }, {
            data: "police_district",
            title: "District",
            name: "police_district",
            visible: false
        }, {
            className: "mobile",
            data: "incident_category",
            title: "Category",
            name: "incident_category",
        }, {
            data: "incident_description",
            title: "Description",
            name: "incident_description",
        }, {
            className: "mobile tablet",
            data: "resolution",
            title: "Resolution",
            name: "resolution",
        }, {
            data: "incident_category",
            title: "Campus Safety Category",
            name: "incident_category",
        }],
        pageLength: 50,
        footerCallback: function(tfoot, data, start, end, display) {
            var dupHeaderRow = $(this.api().table().header()).children('tr:first').clone()
        }
    };

    var _table;

    function _init() {
        _table = $('#example').DataTable(TABLE_CONFIG);
    }

    /*function that contains logic for the 'CSCategory' column & then adjusts the
    incidentJson with the new cscategory field based on this logic*/
    function _csCategoryCheck(incidentJson){
        for (var i = 0; i < incidentJson.length; i++){
            switch (true){
                case incidentJson[i].incident_category === "ARSON":
                    incidentJson[i].cscategory = "ARSON";
                    break;
                case (incidentJson[i].incident_category === "ASSAULT" &&
                    incidentJson[i].incident_description.includes("AGGRAVATED")):
                    incidentJson[i].cscategory = "AGGRAVATED ASSAULT";
                    break;
                case (incidentJson[i].incident_category === "ASSAULT" &&
                    incidentJson[i].incident_description.includes("DATING")):
                    incidentJson[i].cscategory = "DATING VIOLENCE";
                    break;
                case (incidentJson[i].incident_category === "ASSAULT" &&
                    (incidentJson[i].incident_description.includes("HATE") ||
                    incidentJson[i].incident_description.includes("TERROR"))):
                    incidentJson[i].cscategory = "HATE CRIMES";
                    break;
                case (incidentJson[i].incident_category === "ASSAULT" &&
                    incidentJson[i].incident_description.includes("STALKING")):
                    incidentJson[i].cscategory = "STALKING";
                    break;
                case (incidentJson[i].incident_category === "ASSAULT" &&
                    incidentJson[i].resolution.includes("ARREST") &&
                    (incidentJson[i].incident_description.includes("WEAPON") ||
                        incidentJson[i].incident_description.includes("GUN") ||
                        incidentJson[i].incident_description.includes("KNIFE") ||
                        incidentJson[i].incident_description.includes("FIREARM") ||
                        incidentJson[i].incident_description.includes("SHOOTING"))):
                    incidentJson[i].cscategory = "WEAPONS POSSESSION";
                    break;
                case incidentJson[i].incident_category === "BURGLARY":
                    incidentJson[i].cscategory = "BURGLARY";
                    break;
                case (incidentJson[i].incident_category === "DRIVING UNDER THE INFLUENCE" &&
                    incidentJson[i].incident_description.includes("ALCOHOL") &&
                    incidentJson[i].resolution.includes("ARREST")):
                    incidentJson[i].cscategory = "LIQUOR LAW VIOLATIONS";
                    break;
                case (incidentJson[i].incident_category === "DRIVING UNDER THE INFLUENCE" &&
                    incidentJson[i].incident_description.includes("DRUGS") &&
                    incidentJson[i].resolution.includes("ARREST")):
                    incidentJson[i].cscategory = "DRUG-RELATED VIOLATIONS";
                    break;
                case (incidentJson[i].incident_category === "DRUG/NARCOTIC" &&
                    incidentJson[i].resolution.includes("ARREST")):
                    incidentJson[i].cscategory = "DRUG-RELATED VIOLATIONS";
                    break;
                case (incidentJson[i].incident_category === "DRUNKENNESS" &&
                    incidentJson[i].resolution.includes("ARREST")):
                    incidentJson[i].cscategory = "LIQUOR LAW VIOLATIONS";
                    break;
                case (incidentJson[i].incident_category === "LIQUOR LAWS" &&
                    incidentJson[i].resolution.includes("ARREST")):
                    incidentJson[i].cscategory = "LIQUOR LAW VIOLATIONS";
                    break;
                case (incidentJson[i].incident_category === "OTHER OFFENSES" &&
                    incidentJson[i].incident_description.includes("ALCOHOL") &&
                    incidentJson[i].resolution.includes("ARREST")):
                    incidentJson[i].cscategory = "LIQUOR LAW VIOLATIONS";
                    break;
                case incidentJson[i].incident_category === "ROBBERY":
                    incidentJson[i].cscategory = "ROBBERY";
                    break;
                case (incidentJson[i].incident_category === "SECONDARY CODES" &&
                    incidentJson[i].incident_description.includes("DOMESTIC VIOLENCE")):
                    incidentJson[i].cscategory = "DOMESTIC VIOLENCE";
                    break;
                case (incidentJson[i].incident_category === "SECONDARY CODES" &&
                    incidentJson[i].incident_description.includes("PREJUDICE")):
                    incidentJson[i].cscategory = "HATE CRIMES";
                    break;
                case (incidentJson[i].incident_category === "SECONDARY CODES" &&
                    incidentJson[i].incident_description.includes("WEAPONS")):
                    incidentJson[i].cscategory = "WEAPONS POSSESSION";
                    break;
                case (incidentJson[i].incident_category === "SEX OFFENSES, FORCIBLE" ||
                    incidentJson[i].category === "SEX OFFENSES, NON FORCIBLE"):
                    incidentJson[i].cscategory = "SEX OFFENSES";
                    break;
                case incidentJson[i].incident_category === "VEHICLE THEFT":
                    incidentJson[i].cscategory = "MOTOR VEHICLE THEFT";
                    break;
                case (incidentJson[i].incident_category === "WEAPON LAWS" &&
                        incidentJson[i].resolution.includes("ARREST")):
                    incidentJson[i].cscategory = "WEAPONS POSSESSION";
                    break;
                default:
                    incidentJson[i].cscategory = "NONE";
                    break;
            }
        }
        return incidentJson;
    }

    function _loadDataToTable(incidentJson) {
        _table.clear();

        incidentJson = _csCategoryCheck(incidentJson);


        _table.rows.add(incidentJson);
        _table.draw();
    }

    return {
        init: _init,
        loadDataToTable: _loadDataToTable,
        csCategoryCheck: _csCategoryCheck
    };

})(window, jQuery);
