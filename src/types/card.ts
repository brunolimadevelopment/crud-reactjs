import { Client } from "./client";

export type CardProps = {
    client: Client;
    onDeleteClient: (id: string | number | undefined) => void;
}