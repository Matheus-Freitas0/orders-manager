import { DocumentValidationResponse } from "./response/document-validator.response"

export interface OrderValidatorClient{
    
    customerDocumentValidator(document: string): Promise<DocumentValidationResponse>
}
