import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-user-interface',
  template: '<div #rendererContainer></div>'
})
export class UserInterfaceComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer?: ElementRef;

  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private sphere?: THREE.Mesh;

  ngOnInit() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createSphere();
    this.render();
  }
  private createScene(): void {
    this.scene = new THREE.Scene();
    const texture = new THREE.TextureLoader().load('assets/textures/test001.png');
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sphereMaterial = new THREE.MeshLambertMaterial({ map: texture });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.scene.add(this.sphere);
    
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    this.scene.add(light);
  }

  private createCamera(): void {
    this.camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    this.camera.position.z = 5;
  }

  private createRenderer(): void {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(800, 600);
    if (this.rendererContainer && this.rendererContainer.nativeElement) {
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    }
  }

  private createSphere(): void {
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    if(this.scene){
      this.scene.add(this.sphere);
    }
  }

  private render(): void {
    requestAnimationFrame(() => this.render());
    if(this.sphere && this.renderer && this.scene && this.camera){
      this.sphere.rotation.x += 0.01;
      this.sphere.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    }
  }
}