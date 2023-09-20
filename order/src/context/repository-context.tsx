import { Repository } from "../domain";
import { createContext, useContext } from "react";
import { InMemoryDatabase } from "../database";

const repository: Repository = new InMemoryDatabase();
export const RepositoryContext = createContext(repository);
export const useRepository = () => useContext(RepositoryContext);
