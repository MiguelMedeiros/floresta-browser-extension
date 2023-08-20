import React, { useEffect, useMemo, useState } from 'react';
import './Options.css';

import init, { FlorestaChain } from 'example_libfloresta';
import {
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import BaseLayout from '../../containers/layouts/BaseLayout';
import { grey, yellow } from '@mui/material/colors';
import moment from 'moment';

interface Props {
  title: string;
}

interface BlockFloresta {
  tip: string;
  height: number;
  difficulty: string;
  network: string;
  ibd: boolean;
  header: {
    bits: number;
    merkle_root: string;
    nonce: number;
    prev_blockhash: string;
    time: number;
    version: number;
  };
}

const Options: React.FC<Props> = ({ title }: Props) => {
  const [florestaChain, setFlorestaChain] = useState<FlorestaChain | null>(
    null
  );
  const [blockFloresta, setBlockFloresta] = useState<BlockFloresta | null>(
    null
  );

  async function sync(h: any) {
    const res = await fetch('https://api.dlsouza.lol/block/$'.replace('$', h), {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    const block = await res.json();

    if (florestaChain === null) {
      console.log('florestaChain is null');
      return;
    }

    if (block.data === undefined) {
      console.log('block.data is undefined');
      return;
    }

    florestaChain.accept_block(JSON.stringify(block.data));

    const { tip, height, difficulty, network, ibd } = florestaChain;
    setBlockFloresta({
      tip,
      height,
      difficulty,
      network,
      ibd,
      header: block.data.block.header,
    });
    chrome.storage.local.set(
      {
        tip,
        height,
        difficulty,
        network,
        ibd,
      },
      function () {
        // console.log('saved');
      }
    );
  }

  const startDeforesting = async () => {
    if (florestaChain === null) {
      console.log('florestaChain is null');
      return;
    }

    for (let i = 1; i < 20; i++) {
      await sync(i);
      // sleep for 100 ms
      await new Promise((r) => setTimeout(r, 100));
    }

    florestaChain.toggle_ibd();
  };

  const start = async () => {
    await init();
    setFlorestaChain(new FlorestaChain());
  };

  useMemo(() => {
    startDeforesting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [florestaChain]);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseLayout>
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            fontSize: '22px',
            mb: 2,
            color: yellow[700],
            textShadow: '2px 2px 1px #ffffff47',
          }}
        >
          floresta browser extension
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: '16px', mb: 2, color: grey[600] }}
        >
          An extension to the utreexo node that allows it to communicate with a
          floresta node and sync the utreexo forest with the floresta
          blockchain.
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '24px',
                  mb: 2,
                  color: grey[400],
                  textAlign: 'center',
                }}
              >
                last block
              </Typography>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={blockFloresta?.network}
                  size="medium"
                  sx={{ textTransform: 'lowercase', fontSize: '12px' }}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: yellow[800],
                  opacity: 0.8,
                  fontSize: '12px',
                }}
              >
                hash
              </Typography>
              {blockFloresta === null ? (
                <>
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    overflowWrap: 'break-word',
                    mb: 2,
                    color: grey[600],
                  }}
                >
                  {blockFloresta?.tip}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  color: yellow[800],
                  opacity: 0.8,
                  fontSize: '12px',
                }}
              >
                merkle root
              </Typography>
              {blockFloresta === null ? (
                <>
                  <Skeleton animation="wave" sx={{ width: '70px', mt: 0.5 }} />
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    overflowWrap: 'break-word',
                    color: grey[600],
                  }}
                >
                  {blockFloresta?.header?.merkle_root}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: yellow[800],
                  opacity: 0.8,
                  fontSize: '12px',
                }}
              >
                height
              </Typography>
              {blockFloresta === null ? (
                <>
                  <Skeleton animation="wave" sx={{ width: '70px', mt: 0.5 }} />
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    overflowWrap: 'break-word',
                    color: grey[600],
                  }}
                >
                  {blockFloresta?.height}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: yellow[800],
                  opacity: 0.8,
                  fontSize: '12px',
                }}
              >
                difficulty
              </Typography>
              {blockFloresta === null ? (
                <>
                  <Skeleton animation="wave" sx={{ width: '70px', mt: 0.5 }} />
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    overflowWrap: 'break-word',
                    color: grey[600],
                  }}
                >
                  {blockFloresta?.difficulty}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: yellow[800],
                  opacity: 0.8,
                  fontSize: '12px',
                }}
              >
                bits
              </Typography>
              {blockFloresta === null ? (
                <>
                  <Skeleton animation="wave" sx={{ width: '70px', mt: 0.5 }} />
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    overflowWrap: 'break-word',
                    color: grey[600],
                  }}
                >
                  {blockFloresta?.header?.bits}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: yellow[800],
                  opacity: 0.8,
                  fontSize: '12px',
                }}
              >
                nonce
              </Typography>
              {blockFloresta === null ? (
                <>
                  <Skeleton animation="wave" sx={{ width: '70px', mt: 0.5 }} />
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    overflowWrap: 'break-word',
                    color: grey[600],
                  }}
                >
                  {blockFloresta?.header?.nonce}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: yellow[800],
                  opacity: 0.8,
                  fontSize: '12px',
                }}
              >
                time
              </Typography>
              {blockFloresta === null ? (
                <>
                  <Skeleton animation="wave" sx={{ width: '70px', mt: 0.5 }} />
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    overflowWrap: 'break-word',
                    color: grey[600],
                  }}
                >
                  {moment.unix(blockFloresta?.header?.time).fromNow()}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: yellow[800],
                  opacity: 0.8,
                  fontSize: '12px',
                }}
              >
                version
              </Typography>
              {blockFloresta === null ? (
                <>
                  <Skeleton animation="wave" sx={{ width: '70px', mt: 0.5 }} />
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    overflowWrap: 'break-word',
                    color: grey[600],
                  }}
                >
                  {blockFloresta?.header?.version}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: yellow[800],
                  opacity: 0.8,
                  fontSize: '12px',
                }}
              >
                prev blockhash
              </Typography>
              {blockFloresta === null ? (
                <>
                  <Skeleton animation="wave" sx={{ width: '70px', mt: 0.5 }} />
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    overflowWrap: 'break-word',
                    color: grey[600],
                  }}
                >
                  {blockFloresta?.header?.prev_blockhash}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </BaseLayout>
  );
};

export default Options;
