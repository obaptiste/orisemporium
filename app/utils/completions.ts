interface CompletionCreateParamsBase {
  stream?: boolean;
  // Define other common properties here
}

export interface Completion {
  // Structure of the completion result
}

// Assuming Core.RequestOptions is something like this
namespace Core {
  export interface RequestOptions {
    headers?: Record<string, string>;
    queryParams?: Record<string, string | number>;
    // Other possible request options
  }
}

// Assuming APIPromise is a standard Promise with a generic type
type APIPromise<T> = Promise<T>;

export class Completion {
  // ... other class properties and methods

  /**
   * Creates a completion for the provided prompt and parameters.
   */
  create<T extends CompletionCreateParamsBase>(body: T, options?: Core.RequestOptions): APIPromise<Completion> {
    // The actual implementation of `post` might vary depending on how you handle HTTP requests
    return this.post('/completions', { body, ...options, stream: body.stream ?? false }) as APIPromise<Completion>;
  }

  private async post(url: string, data: { body: any, headers?: Record<string, string>, queryParams?: Record<string, string | number>, stream?: boolean }): APIPromise<any> {
    // Prepare the headers
    const headers = {
      'Content-Type': 'application/json',
      ...data.headers
    };

    // Convert queryParams to a format acceptable by URLSearchParams
    const queryParamsString = this.convertQueryParamsToString(data.queryParams);

    const fullUrl = queryParamsString ? `${url}?${queryParamsString}` : url;

    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: headers,
        body: (data.body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Stream handling if necessary
      if (data.stream) {
        // Implement streaming logic here
      } else {
        // Assuming the response needs to be JSON. Modify as necessary.
        return await response.json();
      }
    } catch (error) {
      console.error('Fetch API error:', error);
      throw error;
    }
  }

  private convertQueryParamsToString(queryParams?: Record<string, string | number>): string | undefined {
    if (!queryParams) return undefined;

    // Convert each value to a string
    const entries = Object.entries(queryParams).map(([key, value]) => [key, String(value)]);
    return new URLSearchParams(entries as any).toString();
  }
}




