import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent{

  @Input() lngLat?: [number, number];
  @ViewChild('map') // permite tomar referencia a elemento html
  public divMap?: ElementRef;

  ngAfterViewInit(){

    if ( !this.divMap?.nativeElement ) throw 'Map Div was not found';
    if ( !this.lngLat ) throw 'LngLat can not be null';

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style:'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    new Marker()
      .setLngLat( this.lngLat )
      .addTo( map );
  }


}
