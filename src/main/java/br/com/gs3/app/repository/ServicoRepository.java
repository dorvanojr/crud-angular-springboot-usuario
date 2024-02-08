package br.com.gs3.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.gs3.app.model.Servico;

import java.util.List;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Integer> {
    @Query("select s from Servico s join s.cliente c " +
            "where upper(c.nome) like upper( :nome) and MONTH(s.data) =:mes")
    List<Servico> findByNomeClienteAndMes(@Param("nome")String nome, @Param("mes") Integer mes);
}
