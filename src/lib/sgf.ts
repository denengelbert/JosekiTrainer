import { Console } from "console";

let t= 10;
export function load_sgf(input: string): any {

    if (input.includes('G')) {
        input = input.trim();

        input = input.substring(2, input.length-1);
        input = input.substring(input.indexOf(';')+1);
        
        if (input[0] != 'B' && input[0] != 'W' && input[0] != '(') {
            throw 'Malformed SGF' ;
        }

       // console.log(input);
        //remove comments
         while (input.includes('C')) {
            let start = input.indexOf('C');
            let end  = find_closing_bracket(input.substring(start+1));
    
            //console.log(start, end, input.substring(start, start+end+2));
    
            if (end === -1) {
                throw 'Malformed SGF' ;
            }
            input = input.replace(input.substring(start, start+end+1), '');
           // console.log(input, 1);
           // console.log("   ");
         }
    }
    let res: any[] = [];
    let branch: string;
    if (input.length < 5)
        return {};
    if (input[0]!= '(') {
        //No splitting at this node
        if (!input.includes(';')) {
            //only one move left
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
        let r = load_sgf(rest);
        //console.log(r);
        return [{
            move: input.substring(2,4),
            annotation: current.substring(5),
            end: 'no',
            next: r
        }];
    }
    while (!(input.length  <= 3)) {
        branch = input.substring(2,input.indexOf(')')+1);

        input = input.substring(input.indexOf(')')+1, input.length);
        let current = branch.substring(0, branch.indexOf(';')+1);
        let rest = branch.substring(branch.indexOf(';')+1);
        if (current.includes('(')) {
            current = current.substring(0,current.indexOf('('));
            rest = branch.substring(input.indexOf('('));
        }
       // console.log("currest:", current, rest);
        if (current.includes('(')) {
            current = current.substring(0,current.indexOf('('));
            rest = branch.substring(input.indexOf('('));
        }
        if (!input.includes(';')) {
            res = [... res, {
                    move:  branch.substring(2,4),
                    annotation:  branch.substring(5),
                    end: 'yes',
                    next: []
                }];
        } else {
            res = [... res, {
                move: branch.substring(2,4),
                annotation: current.substring(5),
                end: 'no',
                next: load_sgf(rest)
            }];
        }
    }
    return  res;
}

function find_closing_bracket(input: string): number {
 let cur = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === "[") cur++;
        if (input[i] === "]") cur--;
        if (cur === 0) return i;
    }
    return -1;
}
