// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================

import * as TarefaModel from "../models/tarefaModel.js";

/**
 * Retorna todas as tarefas em formato JSON
 * @route GET /tarefas
 */
export async function listarTarefas(req, res) {
  try {
    const tarefas = await TarefaModel.obterTodasTarefas();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

/**
 * Retorna uma tarefa específica com base no id enviado na URL
 * @route GET /tarefas/:id
 */
export async function obterTarefa(req, res) {
  try {
    const idNumero = Number(req.params.id);

    if (Number.isNaN(idNumero)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const tarefa = await TarefaModel.obterTarefaPorId(idNumero);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

/**
 * Cria uma nova tarefa
 * @route POST /tarefas
 */
export async function criarTarefa(req, res) {
  try {
    const { descricao } = req.body;

    if (typeof descricao !== "string" || descricao.trim() === "") {
      return res.status(400).json({ erro: "Descrição é obrigatória" });
    }

    const tarefaCriada = await TarefaModel.criarNovaTarefa(descricao);

    res.status(201).json({
      mensagem: "Tarefa criada com sucesso!",
      tarefa: tarefaCriada
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

/**
 * Atualiza parcialmente uma tarefa existente
 * @route PATCH /tarefas/:id
 */
export async function atualizarTarefa(req, res) {
  try {
    const idNumero = Number(req.params.id);
    const { descricao, concluida } = req.body;

    if (Number.isNaN(idNumero)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    if (
      descricao !== undefined &&
      (typeof descricao !== "string" || descricao.trim() === "")
    ) {
      return res.status(400).json({ erro: "Descrição inválida" });
    }

    if (concluida !== undefined && typeof concluida !== "boolean") {
      return res.status(400).json({ erro: "concluida deve ser boolean" });
    }

    const tarefaAtualizada = await TarefaModel.atualizarTarefa(
      idNumero,
      descricao,
      concluida
    );

    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({
      mensagem: "Tarefa atualizada com sucesso!",
      tarefa: tarefaAtualizada
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

/**
 * Remove uma tarefa pelo id
 * @route DELETE /tarefas/:id
 */
export async function excluirTarefa(req, res) {
  try {
    const idNumero = Number(req.params.id);

    if (Number.isNaN(idNumero)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const tarefaRemovida = await TarefaModel.excluirTarefa(idNumero);

    if (!tarefaRemovida) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({
      mensagem: "Tarefa excluída com sucesso!",
      tarefa: tarefaRemovida
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}