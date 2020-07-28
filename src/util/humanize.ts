/**
 * Copyright (c) 2020 August
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Returns a humanized string of time
 * @param ms The time itself
 */
export default function humanize(ms: number) {
  const mins = Math.floor(ms / 1000 / 60);
  ms -= mins * 1000 * 60;

  const sec = Math.floor(ms / 1000);

  let humanized = '';
  if (mins > 0) humanized += `${mins} minute${mins === 1 ? '' : 's'}, `;
  if (sec > 0) humanized += `${sec} second${sec === 1 ? '' : 's'}`;

  if (humanized !== '') humanized += `, ${(ms / 1000).toFixed(3)}ms`;
  else humanized += `${(ms / 1000).toFixed(3)}ms`;
  
  return humanized;
}