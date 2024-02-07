package br.com.gs3.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import br.com.gs3.app.dto.ServicoPrestadoDTO;
import br.com.gs3.app.model.Cliente;
import br.com.gs3.app.model.ServicoPrestado;
import br.com.gs3.app.repository.ClienteRepository;
import br.com.gs3.app.repository.ServicoPrestadoRepository;
import br.com.gs3.app.util.BigDecimalConverter;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/servicos-prestados")
@RequiredArgsConstructor
public class ServicoPrestadoController {

    private final ClienteRepository clienteRepository;
    private final ServicoPrestadoRepository repository;
    private final BigDecimalConverter bigDecimalConverter;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoPrestado salvar(@RequestBody @Valid ServicoPrestadoDTO dto){
        LocalDate data = LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Integer idCliente = dto.getIdCliente();

        Cliente cliente =
                clienteRepository
                    .findById(idCliente)
                    .orElseThrow(() ->
                            new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente inexistente"));

        ServicoPrestado sp = new ServicoPrestado();
        sp.setDescricao(dto.getDescricao());
        sp.setData(data);
        sp.setCliente(cliente);
        sp.setValor(bigDecimalConverter.converter(dto.getPreco()));

        return repository.save(sp);
    }

    @GetMapping
    public List<ServicoPrestado> pesquisar(
            @RequestParam(value = "nome", required = false, defaultValue = "") String nome,
            @RequestParam(value = "mes", required = false) Integer mes
            ){
        return repository.findByNomeClienteAndMes( "%" + nome + "%", mes);
    }
}
