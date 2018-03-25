import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import { Refresher, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando: boolean = false;
    
  
  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal:Animal) {
    
    this.pausar_audio(animal);
    
    if(animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    console.log(animal);
    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000);
  }

  private pausar_audio( animalSel: Animal) {

    // Resetear el TimeOut
    clearTimeout(this.audioTiempo);

    this.audio.pause();
    this.audio.currentTime = 0; // Para ubicar el audio al principio del archivo de sonido
    
    for (let animal of this.animales) {
      if (animal.nombre != animalSel.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  borrar_animal(idx: number) {
    // Se elimina un registro desde la posición index
    this.animales.splice( idx,1 );
  }

  recargar_animales( refresher: Refresher ) {
    console.log("Inicio del refresh");
    setTimeout(() => {

      console.log("terminó el refresh");
      this.animales = ANIMALES.slice(0);

      refresher.complete();
    }, 1500);
  }

  reordenar_animales( indices: any ) {
    console.log(indices);

    this.animales = reorderArray(this.animales,indices);
  }
}
