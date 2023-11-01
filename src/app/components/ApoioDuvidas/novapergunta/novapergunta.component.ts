import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Chapter } from 'src/app/models/Chapter';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterTag } from 'src/app/models/ChapterTag';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { ChapterTagService } from 'src/app/services/chapter-tag.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-novapergunta',
  templateUrl: './novapergunta.component.html',
  styleUrls: ['./novapergunta.component.css']
})

export class NovaPerguntaComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  pergunta: ChapterAssunto = new ChapterAssunto();
  chapters: Chapter[] = [];
  text: string = '';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  descriptions: string[] = [];
  allTags: ChapterTag[] = [];
  selectedTags: ChapterTag[] = [];
  chapterNome: string = '';


  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;


  constructor(
    private fb:FormBuilder,
    private service: ChapterAssuntoService,
    private authGuardService: AuthGuardService,
    private chapterService: ChapterService,
    private chapterTagService: ChapterTagService
  ) {

    // tags que aparecem no autocomplete
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((description: string | null) => (description ? this._filter(description) : this.allTags.map(tag => tag.descricao))),
    );

    // todas as tags
    this.chapterTagService.ObterTodos().subscribe(tags => {
      this.allTags = tags;
    });
  }

  ngOnInit(): void {

    // todos os chapters
    this.chapterService.ObterTodos().subscribe((chapters: Chapter[]) => {
      this.chapters = chapters;
    });

    this.form = this.fb.group({
      titulo: [null, [Validators.required, Validators.minLength(5)]],
      chapter: new FormControl('', Validators.required),
      text: [null, [Validators.required, Validators.minLength(5)]],
    });

  }

  // adiciona tag
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.descriptions.push(value);
    }
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  // remove tag
  remove(description: string): void {
    const index = this.descriptions.indexOf(description);
    if (index >= 0) {
      this.descriptions.splice(index, 1);
    }
  }

  // seleciona tag e adiciona no array de tags
  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedTag = this.allTags.find(tag => tag.descricao === event.option.value);
    if (selectedTag) {
      this.descriptions.push(selectedTag.descricao);
      this.selectedTags.push(selectedTag);
    }
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  // filtra tags no autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.map(tag => tag.descricao).filter(description => description.toLowerCase().includes(filterValue));
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }


  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // monta a pergunta
      this.pergunta.titulo = this.form.value.titulo;
      this.pergunta.descricao = this.form.value.text;
      this.pergunta.contadorVisualizacao = 0;
      this.pergunta.status = 1;
      this.pergunta.verificacao = 0;
      this.pergunta.chapterTags = this.selectedTags;
      this.pergunta.chapter.id = this.form.value.chapter;
      this.pergunta.usuario.id = this.authGuardService.getIdUsuarioLogado();
      console.log(this.pergunta);
      // envia a pergunta
      this.service.NovoChapterAssuntoJava(this.pergunta).subscribe(() => {
        console.log("Pergunta enviada");
      });
    }
  }

  onCancel() {
    this.form.reset();
  }

  verificarCampos(): boolean {
      return this.form.valid;
    }
  }


