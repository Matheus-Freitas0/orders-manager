import axios from "axios"
import { OrderValidatorClient } from "../order-validator.client"
import { DocumentValidationResponse } from "../response/document-validator.response"

export class OrderValidatorClientImpl implements OrderValidatorClient {

    static readonly Base_URL = 'http://localhost:3030/customer-validator'

    async customerDocumentValidator(document: string): Promise<DocumentValidationResponse> {
        const url = `${OrderValidatorClientImpl.Base_URL}/document?document=${document}`
        const response = await axios.get(url)
        return response.data as DocumentValidationResponse
    }
}