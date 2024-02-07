package br.com.gs3.app.exception;

public class UsuarioCadastradoException extends RuntimeException{

    public UsuarioCadastradoException(String login){
        super("Usuário já cadastrado com o Login " + login);
    }
}
