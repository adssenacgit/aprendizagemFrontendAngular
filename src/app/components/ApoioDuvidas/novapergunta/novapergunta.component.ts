 import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chapter } from 'src/app/models/Chapter';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { Usuario } from 'src/app/models/Usuario';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-novapergunta',
  templateUrl: './novapergunta.component.html',
  styleUrls: ['./novapergunta.component.css']
})
export class NovaPerguntaComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  pergunta: ChapterAssunto = new ChapterAssunto();
  



  constructor(
    private fb:FormBuilder,private service: ChapterAssuntoService,private serviceUsuario: UsuariosService) { }

    

  ngOnInit(): void {
    this.form = this.fb.group({
      descricao: [null,[Validators.required,Validators.minLength(5)]]
    });
    

       
   // 3b700ecc-cec9-4be4-8c00-48bced543861 id maria estudante
 }    
 hasError(field: string) {
      return this.form.get(field)?.errors;
    }

  
  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid) {
      console.log("Submit");
     
    
      
      
      this.pergunta.descricao = this.form.value;

     


      this.service.NovoChapterAssunto(this.pergunta).subscribe(
        sucess => console.log('sucesso'),
        error => console.error(error),
        () => console.log('request completo')
      );
    }
      
    }

  onCancel() {
    console.log("onCancel");
    this.form.reset();


  }
}