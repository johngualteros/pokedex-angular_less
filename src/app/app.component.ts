import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'pokedex-angular';

  pokemons:any[]=[];
  filterPokemons:any[]=[];
  searchText:string='';
  count:number=20;
  pokemon:any;
  isOpen:boolean=false;

  constructor(private http: HttpClient) {}

  handlePrev(){
    this.count -= 20;
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/?offset=${this.count}&limit=20`)
    .subscribe(
      (response) => {
        this.pokemons = response['results'];
        this.filterPokemons = response['results'];
      }
    )
  }
  handleNext(){
    this.count += 20;
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/?offset=${this.count}&limit=20`)
    .subscribe(
      (response) => {
        this.pokemons = response['results'];
        this.filterPokemons = response['results'];

      }
    )
  }
  searchPokemon(){
    this.filterPokemons = this.pokemons.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(this.searchText.toLowerCase());
    }
    );
  }
  closeModal(){
    this.isOpen = !this.isOpen;
  }
  details(name:string){
    this.isOpen = !this.isOpen;
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .subscribe(
      (response) => {
        this.pokemon = response;
      }
    )
  }
  ngOnInit() {
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/?offset=${this.count}&limit=20`)
    .subscribe(
      (response) => {
        this.pokemons = response['results'];
        this.filterPokemons = response['results'];
      }
    )
  }

}

