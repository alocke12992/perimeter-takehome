# Perimeter takehome

## TODO
### General
[] Shared types across repos

### BE
[] Validation on polygon
[] Validate sessionId is allowed to edit/update polygon
[] Implement unit tests for controllers
[] Dynamically generate fake polygons

### FE
[] Session context
[] Request user location & set as init coordinates


## Thoughts
1. Shape of polygon data - Went back and forth on if I should store as GEOJson or as simple coordinates then map. Opting for sticking to the GeoJSON types 1. consistency in types 2. prevent having to map stored data to GeoJSON type format