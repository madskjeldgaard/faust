/************************************************************************
 ************************************************************************
    FAUST compiler
    Copyright (C) 2003-2020 GRAME, Centre National de Creation Musicale
    ---------------------------------------------------------------------
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation; either version 2.1 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 ************************************************************************
 ************************************************************************/

///<reference path="libfaust.ts"/>
///<reference path="FaustCompiler.ts"/>
///<reference path="FaustWebAudio.ts"/>

namespace Faust {

    export function compileAudioNode(audioCtx: BaseAudioContext, module: FaustModule, dsp_code: string, effect_code: string | null, voices: number, is_double: boolean)
        : Promise<FaustMonoNode | FaustPolyNode | null> {
        let sp = typeof (window.AudioWorkletNode) == "undefined";
        let libfaust = createLibFaust(module);
        if (libfaust) {
            let compiler = createCompiler(libfaust);
            const argv = (is_double) ? "-double -ftz 2" : "-ftz 2";
            if (voices === 0) {
                return createMonoFactory().compileNode(audioCtx, "FaustDSP", compiler, dsp_code, argv, sp, 0);
            } else {
                return createPolyFactory().compileNode(audioCtx, "FaustDSP", compiler, dsp_code, effect_code, argv, voices, sp, 0);
            }
        }
        return new Promise<null>(() => { return null; });
    }
}