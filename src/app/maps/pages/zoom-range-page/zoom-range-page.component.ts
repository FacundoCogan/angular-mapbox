import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{

  @ViewChild('map') // permite tomar referencia a elemento html
  public divMap?: ElementRef;

  public currentZoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-58.63336774575214, -34.59751170478646);

  ngAfterViewInit(): void { // ya tenemos la referencia html

    if ( !this.divMap ) throw 'HTML Element was not found';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(): void {
    if ( !this.map ) throw 'Map not initialized';

    this.map.on('zoom', () => {
      this.currentZoom = this.map!.getZoom();
    });

    this.map.on('zoomend', () => {
      if ( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
    });
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {
    this.currentZoom = Number(value);
    this.map?.zoomTo( this.currentZoom );
  }

}
