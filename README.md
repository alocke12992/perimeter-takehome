# Perimeter takehome

## TODO
### General
[] Shared types across repos
[] combine session with features?

### BE
[] Validation on polygon
[] Validate sessionId is allowed to edit/update features
[] Implement unit tests for controllers
[] Dynamically generate fake polygons

### FE
[x] Session context
[] Request user location & set as init coordinates
[] Fix mapbox draw event type errors

### Extras
[] Add a recenter button


## Thoughts
1. Shape of polygon data - Went back and forth on if I should store as GEOJson or as simple coordinates then map. Opting for sticking to the GeoJSON types 1. consistency in types 2. prevent having to map stored data to GeoJSON type format