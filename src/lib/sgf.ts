let t= 10;
export function load_sgf_rec(input: string): any {
    let res: any[] = [];
    let branch: string;

    if (input.length===0)
        return {};
    if (input[0]!= '(') {
        if (!input.includes(';')) {
            return [{
                move: input.substring(2,4),
                annotation: input.substring(5),
                end: 'yes',
                next: []
            }];
        }
        let current = input.substring(0,input.indexOf(';'));
        let rest = input.substring(input.indexOf(';')+1);
        if (current.includes('(')) {
            current = current.substring(0,current.indexOf('('));
            rest = input.substring(input.indexOf('('));
        }
        return [{
            move: input.substring(2,4),
            annotation: current.substring(5),
            end: 'no',
            next: load_sgf_rec(rest)
        }];
    }
    while (!(input.length == 0)) {
        branch = input.substring(2,input.indexOf(')')+1);

        input = input.substring(input.indexOf(')')+1);
        let current = branch.substring(2, branch.indexOf(';'));
        let rest = branch.substring(branch.indexOf(';')+1);
        if (current.includes('(')) {
            current = current.substring(0,current.indexOf('('));
            rest = branch.substring(input.indexOf('('));
        }

        res = [... res, {
            move: branch.substring(2,4),
            annotation: current.substring(5),
            end: 'no',
            next: load_sgf_rec(rest)
        }];
    }
    return  res;
}

export function load_sgf(input: string): any {
 /*
	(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2024-01-24])
	(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2024-01-24];B[pd])
	(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2024-01-24];B[pd]LB[oq:blabla][qd:arst];W[qc]LB[oq:blabla][qd:arst])
	(;G;B[pd](;W[qc];B[pc];W[qd])(;W[qf];B[nc];W[qd]))
	(;G;B[pd](;W[qc];B[pc];W[qd])(;W[qf];B[nc];W[qd]LB[oq:blabla][qd:arst]))
    */
     input = input.trim();
    if (input.length===0)
        return {};

    input = input.substring(2, input.length-1);
    input = input.substring(input.indexOf(';')+1);

    let current = input.substring(0,input.indexOf(';'));
    let rest = input.substring(input.indexOf(';')+1);
    if (current.includes('(')) {
        current = current.substring(0,current.indexOf('('));
        rest = input.substring(input.indexOf('('));
    }
    return {
        move: current.substring(2,4),
        annotation: current.substring(5),
        end: 'no',
        next: load_sgf_rec(rest),
    }
}