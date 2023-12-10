import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class UserController implements Crud {
  constructor(private readonly citi = new Citi("User")) {}
  create = async (request: Request, response: Response) => {
    const { firstName, lastName, age } = request.body;

    const isAnyUndefined = this.citi.areValuesUndefined(
      firstName,
      lastName,
      age
    );
    if (isAnyUndefined) return response.status(400).send();

    const newUser = { firstName, lastName, age };
    const { httpStatus, message } = await this.citi.insertIntoDatabase(newUser);

    return response.status(httpStatus).send({ message });
  };

  get = async (request: Request, response: Response) => {
    const { httpStatus, values } = await this.citi.getAll();

    return response.status(httpStatus).send(values);
  };

  getUsersByInitial = async (request: Request, response: Response) => {
    try {
      const { letter } = request.params;
      const { httpStatus, values } = await this.citi.getAll();

      // Filtrar usuários cujos nomes começam com a letra especificada
      const filteredUsers = values.filter((user: any) =>
        user.firstName.toLowerCase().startsWith(letter.toLowerCase())
      );

      return response.status(httpStatus).send(filteredUsers);
    } catch (error) {
      console.error("Erro ao obter usuários por inicial:", error);
      return response
        .status(500)
        .send({ message: "Erro interno do servidor." });
    }
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { firstName, lastName, age } = request.body;

    const updatedValues = { firstName, lastName, age };

    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updatedValues
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };
}

export default new UserController();
