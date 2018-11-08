var incidentService = (function(window, $) {

    var INCIDENTS_API_JSON_URL = resourceEndpointsModule.INCIDENTS_API_JSON_URL;

    function _findMostRecentIncident(callback) {
        var query = "?$select=incident_date,incident_datetime"
          + "&$limit=1"
          + "&$order=incident_date DESC,incident_datetime DESC";

        $.get(INCIDENTS_API_JSON_URL + query, function(data) {
            callback(data[0]);
        });
    }

    function _findIncidentsWithPolygonSearch(searchParams, callback) {
        var query = _buildPolygonIncidentDataQuery(searchParams);
        $.get(INCIDENTS_API_JSON_URL + query, callback);
    }

    function _buildPolygonIncidentDataQuery(params) {
        var wellKnownTextPolygon = _buildWellKnownTextFromGeoJson(params.searchGeoJson);

        return "?$select=point,incident_number,incident_category,incident_description,resolution,incident_date,incident_datetime,police_district,analysis_neighborhood"
          + "&$where="
          + "incident_date >= '" + params.startDate + "'"
          + " AND incident_date <= '" + params.endDate + "'"
          + " AND within_polygon(point, \'" + wellKnownTextPolygon + "\')"
          + "&$order=incident_date DESC"
          + "&$limit=100000";
    }

    function _buildWellKnownTextFromGeoJson(geoJson) {
        var coordinates = geoJson.geometry.coordinates[0].map(function(coord) {
            return coord.join(' ');
        }).join(', ');

        return 'MULTIPOLYGON (((' + coordinates + ')))';
    }

    function _findIncidentsWithRadialSearch(searchParams, callback) {
        var query = _buildRadialIncidentDataQuery(searchParams);
        $.get(INCIDENTS_API_JSON_URL + query, callback);
    }

    function _buildRadialIncidentDataQuery(params) {
        return "?$select=point,incident_number,incident_category,incident_description,resolution,incident_date,incident_datetime,police_district,analysis_neighborhood"
          + "&$where="
          + "incident_date >= '" + params.startDate + "'"
          + " AND incident_date <= '" + params.endDate + "'"
          + " AND within_circle(point," +  params.latitude + "," + params.longitude + "," + params.searchRadius + ")"
          + "&$order=incident_date DESC"
          + "&$limit=100000";
    }

    return {
        findMostRecentIncident: _findMostRecentIncident,
        findIncidentsWithPolygonSearch: _findIncidentsWithPolygonSearch,
        findIncidentsWithRadialSearch: _findIncidentsWithRadialSearch,
        buildPolygonIncidentDataQuery: _buildPolygonIncidentDataQuery,
        buildRadialIncidentDataQuery: _buildRadialIncidentDataQuery
    };

})(window, jQuery);

