class ErrorNormalizingWrapper extends Error
{
    constructor(private _error: unknown)
    {
        super();
    }

    get wrappedError(): unknown
    {
        return this._error;
    }

    get name(): string
    {
        let nameToReturn: string;

        if (this._error instanceof Error)
        {
            nameToReturn = this._error.name;
        }
        else if (this._error && typeof this._error === "object" && "name" in this._error)
        {
            nameToReturn = String(this._error.name)
        }
        else
        {
            nameToReturn = String(this._error);
        }

        return nameToReturn;
    }

    get message(): string
    {
        return this.getErrorMessage("Unknown Error");
    }

    public getErrorMessage(defaultMessage?: string): string
    {
        let messageToReturn: string = defaultMessage ?? "Unknown Error";

        if ((this._error instanceof Error) && (this._error.message.length > 0))
        {
            messageToReturn = this._error.message;
        }
        else if (this._error && typeof this._error === "object" && "message" in this._error && this._error.message)
        {
            const messageCandidate = String(this._error.message);
            if (messageCandidate.length > 0)
            {
                messageToReturn = messageCandidate;
            }
        }

        return messageToReturn;
    }

    // FIXME - Error.stack is non-standard and this does not seem to be working
    get stack(): string|undefined
    {
        let stackToReturn: string|undefined;

        if (this._error instanceof Error)
        {
            stackToReturn = this._error.stack;
        }
        else if (this._error && typeof this._error === "object" && "stack" in this._error && this._error.stack)
        {
            stackToReturn = String(this._error.stack)
        }

        return stackToReturn;
    }
}

export {ErrorNormalizingWrapper};