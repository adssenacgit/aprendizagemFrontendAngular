import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Chapter } from 'src/app/models/Chapter';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { ChapterService } from 'src/app/services/chapter.service';



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
  selectedTags: string[] = []; // TAGS NÃO FUNCIONAM, PRECISA IMPLEMENTAR NA API


  constructor(
    private fb:FormBuilder,
    private service: ChapterAssuntoService,
    private authGuardService: AuthGuardService,
    private chapterService: ChapterService
    ) { }



  ngOnInit(): void {
    this.chapterService.ObterTodos().subscribe((chapters: Chapter[]) => {
      this.chapters = chapters;
    });
    this.form = this.fb.group({
      titulo: [null,[Validators.required,Validators.minLength(5)]],
      chapter: new FormControl('', Validators.required),
      text: [null,[Validators.required,Validators.minLength(5)]],
      tags: new FormControl('')
    });

  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onTagInput(event: KeyboardEvent) { // TAGS SÓ FUNCIONAM NO HTML, NÃO NO BACKEND
    if (event.key === 'Enter') {
      event.preventDefault();
      const tagInput = event.target as HTMLInputElement;
      const tags = tagInput.value.split(',');
      for (const tag of tags) {
        const trimmedTag = tag.trim();
        if (trimmedTag && !this.selectedTags.includes(trimmedTag)) {
          this.selectedTags.push(trimmedTag);
        }
      }
      tagInput.value = '';
    }
  }

  removeTag(tag: string) {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid) {
      console.log("Submit");
      console.log(this.form.value.titulo);
      console.log(this.form.value.text);
      console.log(this.form.value.chapter);
      console.log(this.form.value.tags);


      this.pergunta.titulo = this.form.value.titulo
      this.pergunta.descricao = this.form.value.text
      this.pergunta.contadorVisualizacao = 0
      this.pergunta.status = 1
      this.pergunta.verificacao = 0
      this.pergunta.chapterId =  this.form.value.chapter
      this.pergunta.usuarioId = this.authGuardService.getIdUsuarioLogado()
     // this.pergunta.chapterTag = this.form.value.tags;  TAGS NÃO FUNCIONAM
      this.service.NovoChapterAssunto(this.pergunta).subscribe();
      console.log("Pergunta enviada");
    }

  }

  onCancel() {
    console.log("onCancel");
    this.form.reset();
  }
}
