/* Corretor de REFERÊNCIA: as mesmas expressões que o app usa hoje para decidir se uma resposta está certa
   (ui/screens/quiz-renderers.js: rMC, rTF, rNum). Serve para provar que a correção no servidor
   (função SQL live_grade) dá o mesmo veredito do app. Não é usado em tempo de execução do Live.
   tests/live-projection.test.js falha se qualquer uma destas expressões mudar no renderizador. */

/* rMC: check: () => ui.sel === x.a   (a alternativa escolhida é a correta)  */
export const refGradeMC = (x, chosenOptionText) => chosenOptionText === x.o[x.a];

/* rTF: const ans = x.a ? 0 : 1;  check: () => ui.sel === ans   (índice 0 = Verdadeiro) */
export const refGradeTF = (x, value) => (value ? 0 : 1) === (x.a ? 0 : 1);

/* rNum: Math.abs(parseBR(inp.value) - x.a) <= (x.tol !== undefined ? x.tol : 0.015 + Math.abs(x.a) * 0.002) */
export const refGradeNum = (x, value) => Math.abs(value - x.a) <= (x.tol !== undefined ? x.tol : 0.015 + Math.abs(x.a) * 0.002);
