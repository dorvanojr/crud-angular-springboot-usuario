package br.com.gs3.app.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gs3.app.model.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsername(String username);

    boolean existsByUsername(String username);
}
