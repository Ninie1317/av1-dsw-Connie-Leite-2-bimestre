import { prisma } from "../config/prisma.js";

export async function obterTodasTarefas() {
  return await prisma.task.findMany();
}

export async function obterTarefaPorId(id) {
  return await prisma.task.findUnique({
    where: { id }
  });
}

export async function criarNovaTarefa(descricao) {
  return await prisma.task.create({
    data: {
      title: descricao,
      completed: false
    }
  });
}

export async function atualizarTarefa(id, descricao, concluida) {
  const tarefa = await prisma.task.findUnique({
    where: { id }
  });

  if (!tarefa) return null;

  return await prisma.task.update({
    where: { id },
    data: {
      ...(descricao !== undefined && { title: descricao }),
      ...(concluida !== undefined && { completed: concluida })
    }
  });
}

export async function excluirTarefa(id) {
  const tarefa = await prisma.task.findUnique({
    where: { id }
  });

  if (!tarefa) return null;

  return await prisma.task.delete({
    where: { id }
  });
}