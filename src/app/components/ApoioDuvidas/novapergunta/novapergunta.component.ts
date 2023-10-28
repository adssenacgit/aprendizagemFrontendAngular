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
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
  tagCtrl = new FormControl();
  filteredTags: Observable<ChapterTag[]>;
  chapterTags: ChapterTag[] = [];
  allChapterTags: ChapterTag[] = [];
  selectedTags: ChapterTag[] = [];
  separatorKeysCodes: number[] = [COMMA, ENTER];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private fb:FormBuilder,
    private service: ChapterAssuntoService,
    private authGuardService: AuthGuardService,
    private chapterService: ChapterService,
    private chapterTagService: ChapterTagService
  ) { }

  ngOnInit(): void {
    this.chapterService.ObterTodos().subscribe((chapters: Chapter[]) => {
      this.chapters = chapters;
    });
    this.chapterTagService.ObterTodos().subscribe((chapterTags: ChapterTag[]) => {
      this.allChapterTags = chapterTags;
    });

    this.form = this.fb.group({
      titulo: [null, [Validators.required, Validators.minLength(5)]],
      chapter: new FormControl('', Validators.required),
      text: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (value) {
      const chapterTag: ChapterTag = { id: 0, descricao: value, status: 1 };
      this.selectedTags.push(chapterTag);
    }

    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  removeTag(tag: ChapterTag): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedTag: ChapterTag = event.option.value;

    if (!this.selectedTags.find(tag => tag.id === selectedTag.id)) {
      this.selectedTags.push(selectedTag);
    }

    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.pergunta.titulo = this.form.value.titulo;
      this.pergunta.descricao = this.form.value.text;
      this.pergunta.contadorVisualizacao = 0;
      this.pergunta.status = 1;
      this.pergunta.verificacao = 0;
      this.pergunta.chapterId = this.form.value.chapter;
      this.pergunta.usuarioId = this.authGuardService.getIdUsuarioLogado();

      // Aqui você associa as tags selecionadas à pergunta
      this.pergunta.chapterTags = this.selectedTags;

      console.log(this.form.value.titulo);
      console.log(this.form.value.text);
      console.log(this.form.value.chapter);
      console.log(this.authGuardService.getIdUsuarioLogado());
      console.log(this.selectedTags);

      this.service.NovoChapterAssunto(this.pergunta).subscribe(() => {
        console.log("Pergunta enviada");
      });
    }
  }

  onCancel() {
    this.form.reset();
  }
}
