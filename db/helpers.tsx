// check the validity of id          String      @id @default(cuid())
export const checkId = (id: string): boolean => {
	const cuidRegex = /^c[^\s-]{8,}$/;
	return cuidRegex.test(id);
};
