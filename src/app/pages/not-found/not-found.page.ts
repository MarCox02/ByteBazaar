import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {

  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {
    this.menuCtrl.enable(false,'vendedor')
    this.menuCtrl.enable(false,'comprador')

  }
  isMusicPlaying: boolean = false; // Estado inicial de la música

  playAudio() {
    const audio: HTMLAudioElement = document.getElementById('rickrollAudio') as HTMLAudioElement;
    if (audio) {
      audio.play();
    }
  }

  pauseAudio() {
    const audio: HTMLAudioElement = document.getElementById('rickrollAudio') as HTMLAudioElement;
    if (audio) {
      audio.pause();
    }
  }

  toggleMusic() {
    const audio: HTMLAudioElement = document.getElementById('rickrollAudio') as HTMLAudioElement;

    if (audio) {
      if (this.isMusicPlaying) {
        this.pauseAudio();
      } else {
        this.playAudio();
      }

      this.isMusicPlaying = !this.isMusicPlaying; // Cambia el estado
    }
  }
}
