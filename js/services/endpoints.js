var resourceEndpointsModule = (function(window, $) {

    return {
        INCIDENTS_API_JSON_URL: 'https://data.sfgov.org/resource/nwbb-fxkq.json',
        INCIDENTS_API_GEOJSON_URL: 'https://data.sfgov.org/resource/nwbb-fxkq.geojson',
        INCIDENTS_API_CSV_URL: 'https://data.sfgov.org/resource/nwbb-fxkq.csv',

        MAPZEN_API_ADDRESS_SUGGESTIONS_URL: 'https://search.mapzen.com/v1/autocomplete',
        MAPZEN_API_ADDRESS_SEARCH_URL: 'https://search.mapzen.com/v1/search',

        MAPBOX_API_REVERSE_GEOLOCATION_URL: 'https://api.mapbox.com/v4/geocode/mapbox.places'
    };

})(window, jQuery);